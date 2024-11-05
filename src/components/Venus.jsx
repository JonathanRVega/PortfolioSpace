import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import VenusTexture from '../textures/Venus.jpg';
import { calculatePosition } from '../utils/utils';
import Ecliptic from './Ecliptic';

export default function Venus(props) {
  const { planetRadius, orbitRadius, angle } = props;
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const colorMap = useLoader(TextureLoader, VenusTexture);
  const { setActivePlanet } = useActivePlanet();
  const handleVenusClick = (event) => {
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
        name="Venus"
        position={pos}
        onClick={handleVenusClick}
      >
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshPhongMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={orbitRadius} zRadius={orbitRadius} />
    </>
  );
}
