<template>
  <section class="w-100 h-100 d-flex align-items-center">
    <!-- <pre ref="out"></pre> -->
    <button v-if="!started" class="btn btn-primary mx-auto p-3" @click="startSim">Get started</button>
    <canvas v-else ref="canvas"></canvas>
  </section>
</template>

<script lang="ts" setup>
import {
AmbientLight, Line, Group, PerspectiveCamera, PointLight, Scene, Vector3, WebGLRenderer, ArrowHelper, Box3, BufferGeometry, BufferAttribute, LineBasicMaterial
} from 'three'
import { getSatelliteInfo } from 'tle.js'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useXrUtility } from './useXrUtility'

// Model loader
const loader = new GLTFLoader();
let dl = new DRACOLoader
dl.setDecoderPath('/iss-tracker/assets/draco/');
dl.preload();
loader.setDRACOLoader(dl)

// DOM references
let canvas = ref<HTMLCanvasElement | null>();
// let out = ref<HTMLElement | null>()

// Control values
let animationSpeed = ref(100)

// Scene elements/rendering objects
let scene = new Scene();
let camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.01, 1000000 );
let ctrls: OrbitControls
let system: Group, station: Group, planet: Group
let renderer: WebGLRenderer
let arrow: ArrowHelper
// Orbital pathing
let PastLine = new Line();
let FutureLine = new Line();
let drawCount: number = 0
let FuturedrawCount: number = 0
let MAX_POINTS: number = 800

let issTle: string

async function main() {
  if (!canvas.value) {
    throw new Error('Missing canvas on startup')
  }
  
  // Set up XR
  let { checkSupport, startSession } = useXrUtility(canvas.value)

  if (!await checkSupport()) {
    // No XR for us :(
      throw new Error('No XR')
  }

  let { ctx, refSpace, session } = await startSession()
  
  renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    context: ctx,
    canvas: canvas.value
  });

  renderer.setClearColor(0x224488, 0.1)
  renderer.xr.enabled = true
  renderer.xr.setReferenceSpaceType('local')
  renderer.xr.setSession(session)
  onResize()
  
  ctrls = new OrbitControls(camera, renderer.domElement)

  // Add some ambient light so the dark side of the planet is somewhat visible
  // TODO have a separate texture of "night earth" with lights
  let ambientLight = new AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  let tleData: any
  
  // Retrieve our models and TLE data
  [
    { scene: station },
    { scene: planet },
    tleData
  ] = await Promise.all([
    // loader.loadAsync('ISS_stationary_lo.glb'),
    // loader.loadAsync('MoonScaled.glb'),
     loader.loadAsync('/iss-tracker/assets/models/ISS_stationary_lo.glb'),
     loader.loadAsync('/iss-tracker/assets/models/MoonScaled.glb'),
    
    // 25544 = ISS (Zarya)
    fetch('https://tle.ivanstanojevic.me/api/tle/25544').then(res => res.json())
  ])

  // Store the TLE in it's textual format
  issTle = `${tleData.name}\n${tleData.line1}\n${tleData.line2}`

  // Earth = 12,742 km diameter, model = 1,000 unit diameter
  // Scale so 1 unit = 1 km
  let scale = 12_742 / 1_000
  planet.scale.set(scale, scale, scale)

  // "system" is a rotating Earth reference frame
  // NB planet is not the root of the reference frame as it has a scale
  system = new Group()

  // Initialize the orbit visualization
  tracer(MAX_POINTS)

  // Apply axial tilt
  // NB this applies to both the planet and the station as we have planet based lat/lon
  // TODO position the "sun" light appropriate to the time of year
  system.rotateX(23.5 * Math.PI / 180)
  
  // Scale the ISS so it is visible, but not intersecting the planet
  station.scale.set(20, 20, 20)
  
  // Link the scene together
  scene.add(system)
  system.attach(station)
  system.attach(planet)

  // Set up our pointer
  arrow = new ArrowHelper(new Vector3(2, 0, 0), new Vector3(0, 0, 0), 0.1, 0xff0000);
  let al = 0.1
  arrow.setLength(al, al*0.5, al*0.2);
  (window as any).arrow = arrow
  //camera.attach(arrow)
  //arrow.position.set(0, 0, 1)
  scene.add(arrow)
  let box = new Box3()
  box.setFromObject(arrow)
  console.log(box)

  camera.position.z = 9000;
  ctrls.update()

  function animate() {
    if (halted) return
    session.requestAnimationFrame( animate );


    if (station) {
      // Modify time based on when we arrived and animationSpeed
      let when = start + (new Date().getTime() - start) * animationSpeed.value
      setWhen(when)

      let cameraPos = new Vector3()
      let cameraDir = new Vector3()
      camera.getWorldPosition(cameraPos)
      camera.getWorldDirection(cameraDir)
      arrow.position.copy(cameraPos.add(cameraDir))
      
      let worldPos = new Vector3()
      station.getWorldPosition(worldPos)
      arrow.setDirection(worldPos.normalize())

      
    }

    if (!session.renderState.baseLayer) throw new Error('Failed to get XR buffer')

    ctx.bindFramebuffer(ctx.FRAMEBUFFER, session.renderState.baseLayer.framebuffer)
    renderer.render( scene, camera );

  };

  session.requestAnimationFrame(animate)
  
}

let started = ref(false)

async function startSim() {
  try {
    started.value = true
    await nextTick()
    main()
  } catch (e) {
    console.error('Failed in main', e)
  }
}

// Create a light source to represent the sun
let fakeSun = new PointLight(0xffffff, 1.5, 1e9)
fakeSun.position.z = 2000000;
scene.add(fakeSun)

let start = new Date().getTime()

// Main render loop
let halted = false

// Stop the simulation if we e.g. navigate away
onUnmounted(() => halted = true)

/** Sets the simulation to the specified time */
function setWhen(when: number) {
  // Move the station
  station.position.copy(getTleXyz(issTle, when))

  // Set planet rotation
  let asDate = new Date(when)
  let hours = asDate.getUTCHours() + asDate.getUTCMinutes() / 60 + asDate.getUTCSeconds() / 3600
  system.rotation.y = hours / 24 * 2 * Math.PI

  // Line drawing
  PastLine.geometry.setDrawRange( 0, drawCount );
  PastLine.geometry.attributes.position.setXYZ(drawCount,station.position.x,station.position.y,station.position.z);
  drawCount = ( drawCount + 1 ) % MAX_POINTS;

  

  //Future Line
  FutureLine.geometry.setDrawRange( 0, FuturedrawCount );
  
  let FutureLineposition: Vector3 = getTleXyz(issTle, when+380_000);
  if(FuturedrawCount === 0){
    FutureLine.geometry.attributes.position.setXYZ(FuturedrawCount,station.position.x,station.position.y,station.position.z);
  }
  else{
    FutureLine.geometry.attributes.position.setXYZ(FuturedrawCount,FutureLineposition.x,FutureLineposition.y,FutureLineposition.z);
  }
  FuturedrawCount = ( FuturedrawCount + 1 ) % (MAX_POINTS / 4);
  
  PastLine.geometry.attributes.position.needsUpdate = true; // required after the first render
  FutureLine.geometry.attributes.position.needsUpdate = true; // required after the first render
}


function tracer(MAX_POINTS: number){

  // geomtry
  let geometry = new BufferGeometry();

  // attributes
  var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point

  geometry.setAttribute( 'position', new BufferAttribute( positions, 3 ) );

  // material
  var material = new LineBasicMaterial( { color: 0xffffff, linewidth: 1 } );
  material.color.setHex(0xFF0000)

  // line
  PastLine = new Line( geometry,  material );
  system.attach( PastLine );

  // geomtry
  let Futuregeometry = new BufferGeometry();

  // attributes
  var Futurepositions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point

  Futuregeometry.setAttribute( 'position', new BufferAttribute( Futurepositions, 3 ) );
  // line
  var Futurematerial = new LineBasicMaterial( { color: 0xffffff, linewidth: 1 } );
  Futurematerial.color.setHex(0xFFFFFF)

  FutureLine = new Line( Futuregeometry,  Futurematerial );
  FutureLine.scale.set(1.001,1.001,1.001)
  system.attach( FutureLine );

}

/** Given a TLE and a timestamp, project the position to a spherical approximation in R3 */
function getTleXyz(tle: string, when: number): Vector3 {
  let info = getSatelliteInfo(tle,
    when,
    // TODO retrieve the user's location
    -83,
    42,
    800
  )

  // Convert to radians
  let lat = info.lat * Math.PI / 180
  let lon = info.lng * Math.PI / 180

  // Convert to R3
  return new Vector3(
    (12_742/2 + info.height) * -Math.sin(lon) * Math.cos(lat),
    (12_742/2 + info.height) * Math.sin(lat),
    (12_742/2 + info.height) * -Math.cos(lon) * Math.cos(lat),
  )
}


// Maintains the renderer parameters when we resize the window
function onResize() {
  if (canvas.value && renderer) {
    canvas.value.width = innerWidth
    canvas.value.height = innerHeight
    renderer.setSize(canvas.value.width, canvas.value.height)
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    
  }
}

onMounted(() => addEventListener('resize', onResize))
onUnmounted(() => removeEventListener('resize', onResize))

</script>

<style lang="scss">
canvas {
  height: 100%;
  width: 100%;
  background: mediumaquamarine;
}

pre {
  position: absolute;
  top: 0;
  left: -28rem;
  background: white;
  width: 30rem;
  height: 14rem;
  transition: left 300ms ease;

  &:hover {
    left: 0;
  }
}
</style>
