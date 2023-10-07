import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

import BackGround from './BackGround';
import Moon from './Moon';
import Wireframe from './Wireframe';
import Sun from './Sun';
import Wave from './Wave';
import AxesHelper from './AxesHelper';
import Lander from './Lander';
import Menu from './Menu';
import QuakeInfo from './QuakeInfo';
import loader from '../assets/loader.gif';
import Legend from './Legend';
import Places from './Places';

import '../styles/Space.scss';

function Space() {
  const [axes, setAxes] = useState(0);
  const [directionalLightIntensity, setDirectionalLightIntensity] = useState(50);
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(3);
  const [wireframe, setWireframe] = useState(false);
  const [heightMap, setHeightMap] = useState(false);
  const [apolloLanders, setApolloLanders] = useState(true);
  const [quake, setQuake] = useState([]);
  const [places, setPlaces] = useState(true);
  const [camera, setCamera] = useState([0, 0, 6]);

  const landerLocation = [
    [1, 23, 11],
    [-3, -23, 12],
    [-3, -17, 14],
    [26, 4, 15],
    [-9, 16, 16],
    [20, 31, 17],
  ];

  const placesLocation = [
    [10, 23.43, 'Mare Tranquillitatis'],
    [38.28, -20, 'Mare Imbrium'],
    [15, 3.6, 'Mare Vaporum'],
    [8.5, -30.9, 'Mare Insularum'],
    [30, 12.5, 'Mare Serenitatis'],
    [20, 55.1, 'Mare Crisium'],
    [-18.3, -19.6, 'Mare Nubium'],
    [-10.2, 30.6, 'Mare Nectaris'],
    [-0.8, 45.3, 'Mare Fecunditatis'],
    [-20.4, -43.6, 'Mare Humorum'],
    [-7.5, -26.3, 'Mare Cognitum'],
    [16.4, -59.4, 'Oceanus Procellarum'],
  ];

  return (
    <>
      <Link className='back' to='/'>
        &lt;Back to Home
      </Link>
      <div className='space'>
        <Suspense
          fallback={
            <div className='loader'>
              <img className='loader__img' src={loader} alt='loader' />
            </div>
          }
        >
          <Canvas className='canvas'>
            <PerspectiveCamera makeDefault position={camera} />

            <OrbitControls enableZoom={true} minDistance={3.2} maxDistance={6} enablePan={true} autoRotate={false} />
            <ambientLight intensity={ambientLightIntensity / 100} />
            <spotLight position={[0, 0, 0]} intensity={2} angle={Math.PI} />
            <directionalLight position={[0, 0, 100]} intensity={directionalLightIntensity / 100} angle={-0.3} />
            <BackGround />
            <Moon heightMap={heightMap} />
            {wireframe && <Wireframe />}
            <AxesHelper axes={axes} />
            <Sun />
            {apolloLanders &&
              landerLocation.map((lander, index) => {
                return <Lander key={index} lat={lander[0]} long={lander[1]} num={lander[2]} />;
              })}
            <Wave quake={quake} />
            {places &&
              placesLocation.map((place, index) => {
                return <Places key={index} lat={place[0]} long={place[1]} name={place[2]} />;
              })}
          </Canvas>
        </Suspense>
      </div>
      <Menu
        axes={axes}
        setAxes={setAxes}
        directionalLightIntensity={directionalLightIntensity}
        setDirectionalLightIntensity={setDirectionalLightIntensity}
        ambientLightIntensity={ambientLightIntensity}
        setAmbientLightIntensity={setAmbientLightIntensity}
        wireframe={wireframe}
        setWireframe={setWireframe}
        heightMap={heightMap}
        setHeightMap={setHeightMap}
        apolloLanders={apolloLanders}
        setApolloLanders={setApolloLanders}
        quake={quake}
        setQuake={setQuake}
        places={places}
        setPlaces={setPlaces}
        setCamera={setCamera}
      />
      <QuakeInfo quake={quake} />
      {heightMap && <Legend />}
    </>
  );
}

export default Space;
