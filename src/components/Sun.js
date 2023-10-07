import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import sun from '../assets/sun.jpg';

function Sun() {
  const sunTexture = useLoader(THREE.TextureLoader, sun);

  return (
    <>
      <mesh position={[0, 0, 500]}>
        <sphereGeometry attach='geometry' args={[15, 100, 100]} />
        <meshStandardMaterial map={sunTexture} wireframe={false} />
      </mesh>
    </>
  );
}

export default Sun;
