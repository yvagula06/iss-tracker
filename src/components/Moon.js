import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import moon from '../assets/moon.jpg';
import height from '../assets/height.jpg';

function Moon({ heightMap }) {
  const moonTexture = useLoader(THREE.TextureLoader, moon);
  const heightMapTexture = useLoader(THREE.TextureLoader, height);

  return (
    <>
      <mesh>
        <sphereGeometry attach='geometry' args={[2, 64, 64, -Math.PI / 2]} />
        <meshStandardMaterial map={heightMap === true ? heightMapTexture : moonTexture} wireframe={false} />
      </mesh>
    </>
  );
}

export default Moon;
