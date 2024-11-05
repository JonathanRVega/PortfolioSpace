import { useFrame, useLoader } from '@react-three/fiber';
import { EffectComposer, GodRays } from '@react-three/postprocessing';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import SunMap from '../textures/Sun.jpg';

export default function Sun() {
  const colorMap = useLoader(TextureLoader, SunMap);
  const { setPlanets } = usePlanets();
  const sunRef = useRef();
  const composer = useRef();
  const ref = useRef();
  const { setActivePlanet } = useActivePlanet();
  // const handleSunClick = (event) => {
  //   event.stopPropagation();
  //   setActivePlanet(sunRef.current);
  // };
  useEffect(() => {
    setPlanets(ref.current);
  }, []);

  useFrame(() => {
    sunRef.current.rotation.y += 0.001;
    composer.current.render();
  }, 1);

  return (
    <group>
      <mesh ref={ref} name="Sun">
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color={'yellow'} />
      </mesh>
      <mesh angle={0} orbitRadius={0} planetRadius={6} ref={sunRef}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial map={colorMap} />
      </mesh>
      {sunRef.current && (
        <EffectComposer ref={composer} multisampling={0}>
          <GodRays
            sun={sunRef.current}
            samples={30}
            density={0.97}
            decay={0.75}
            weight={0.6}
            exposure={0.9}
          />
        </EffectComposer>
      )}
    </group>
  );
}
