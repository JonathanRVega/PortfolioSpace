import { Loader, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect } from 'react';
import { useCurve } from '../hooks/useCurve';
import { usePlanets } from '../hooks/usePlanets';
import Camera from './Camera';
import Curve from './Curve';
import Earth from './Earth';
import Jupiter from './Jupiter';
import Lights from './Lights';
import Mars from './Mars';
import Mercury from './Mercury';
import Neptune from './Neptune';
import Saturn from './Saturn';
import Sun from './Sun';
import Uranus from './Uranus';
import Venus from './Venus';

export default function Scene() {
  const { curveProps } = useCurve();
  const { removePlanet } = usePlanets();

  useEffect(() => {
    return () => {
      removePlanet();
    };
  }, []);
  return (
    <>
      <Canvas linear shadows camera={{ position: [0, 250, 0], fov: 45 }}>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        <Camera />
        <Suspense fallback={null}>
          <Sun />
          <Mercury orbitRadius={10} angle={-10} planetRadius={1} />
          <Venus orbitRadius={20} angle={15} planetRadius={2} />
          <Earth planetRadius={2.5} orbitRadius={30} angle={45} />
          <Mars planetRadius={2.2} orbitRadius={40} angle={90} />
          <Jupiter planetRadius={3.5} orbitRadius={50} angle={135} />
          <Saturn planetRadius={3} orbitRadius={60} angle={186} />
          <Uranus planetRadius={2} orbitRadius={70} angle={230} />
          <Neptune planetRadius={1.7} orbitRadius={80} angle={300} />
        </Suspense>
        <Lights />
        <Curve {...curveProps} numberOfPoints={40} />
      </Canvas>
      <Loader />
    </>
  );
}
