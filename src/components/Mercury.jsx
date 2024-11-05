import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import MercuryMap from '../textures/Mercury.jpg';
import { calculatePosition } from '../utils/utils';
import Ecliptic from './Ecliptic';

export default function Mercury(props) {
  const { planetRadius, orbitRadius, angle } = props;
  const colorMap = useLoader(TextureLoader, MercuryMap);
  const planetRef = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handleClick = (e) => {
    e.stopPropagation();
    setActivePlanet(planetRef.current);
  };

  const pos = calculatePosition(angle, orbitRadius);

  useEffect(() => {
    setPlanets(planetRef.current);
  }, []);

  return (
    <>
      <mesh
        {...props}
        ref={planetRef}
        name="Mercury"
        position={pos}
        onClick={handleClick}
        receiveShadow
      >
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={orbitRadius} zRadius={orbitRadius} />
    </>
  );
}
