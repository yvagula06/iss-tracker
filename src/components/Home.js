import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import BackGround from './BackGround';
import Moon from './Moon';
import Navbar from './Navbar';
import Hero from './Hero';

function Home() {
  const [about, setAbout] = useState(true);

  return (
    <div className='home'>
      <div className='div'>
        <Canvas className='canvas' camera={{ fov: 35, zoom: 0.5, near: 1, far: 1000 }}>
          <OrbitControls autoRotate={true} />
          <Suspense>
            <ambientLight intensity={2 / 100} />
            <directionalLight position={[0, 0, 100]} intensity={50 / 100} angle={-0.3} />
            <BackGround />
            <Moon />
          </Suspense>
        </Canvas>
      </div>
      <Navbar about={about} setAbout={setAbout} />
      <Hero />
    </div>
  );
}

export default Home;
