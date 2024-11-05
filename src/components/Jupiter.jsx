import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import JupiterTexture from '../textures/Jupiter.jpg';
import { calculatePosition } from '../utils/utils';
import Ecliptic from './Ecliptic';

export default function Jupiter(props) {
  const { planetRadius, orbitRadius, angle } = props;
  const colorMap = useLoader(TextureLoader, JupiterTexture);
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handleJupiterClick = (event) => {
    event.stopPropagation();
    setActivePlanet(ref.current);
  };
  const pos = calculatePosition(angle, orbitRadius);

  useEffect(() => {
    setPlanets(ref.current);
  }, []);

  return (
    <>
      <mesh
        {...props}
        ref={ref}
        name="Jupiter"
        position={pos}
        onClick={handleJupiterClick}
      >
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={orbitRadius} zRadius={orbitRadius} />
    </>
  );
}
