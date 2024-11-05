import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { BackSide, Vector3 } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import SaturnTexture from '../textures/Saturn.jpg';
import Rings from '../textures/saturn_rings.png';
import { calculatePosition } from '../utils/utils';
import Ecliptic from './Ecliptic';

export default function Saturn(props) {
  const { planetRadius, orbitRadius, angle } = props;
  const [colorMap, ringsMap] = useLoader(TextureLoader, [SaturnTexture, Rings]);
  const ref = useRef();
  const ringRef = useRef();
  const ringGeoRef = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handleSaturnClick = (event) => {
    event.stopPropagation();
    setActivePlanet(ref.current);
  };
  const pos = calculatePosition(angle, orbitRadius);

  useEffect(() => {
    const geometry = ringGeoRef.current;
    const pos = geometry.attributes.position;
    var v3 = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      geometry.attributes.uv.setXY(i, v3.length() < 5 ? 0 : 1, 1);
    }

    ringRef.current.rotation.x = 4.7;
    ringRef.current.rotation.y = 0.2;
    setPlanets(ref.current);
  }, []);

  return (
    <group>
      <mesh
        {...props}
        ref={ref}
        name="Saturn"
        position={pos}
        castShadow
        onClick={handleSaturnClick}
      >
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshPhysicalMaterial map={colorMap} />
      </mesh>
      <mesh ref={ringRef} position={pos} receiveShadow>
        <ringGeometry
          ref={ringGeoRef}
          args={[planetRadius + 1, planetRadius + 4, 64]}
        />
        <shadowMaterial attach="material" transparent opacity={0.4} />
        <meshPhongMaterial
          map={ringsMap}
          transparent
          side={2}
          shadowSide={BackSide}
        />
      </mesh>
      <Ecliptic xRadius={orbitRadius} zRadius={orbitRadius} />
    </group>
  );
}
