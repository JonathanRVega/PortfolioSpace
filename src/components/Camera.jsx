import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { useCurve } from '../hooks/useCurve';
import { useCustomCamera } from '../hooks/useCustomCamera';
import { calculatePosition } from '../utils/utils';

export default function Camera() {
  const { camera } = useThree();
  const { activePlanet } = useActivePlanet();
  const { cameraLookAt, setCameraLookAt } = useCustomCamera();
  const useMin = useRef(0);
  const refControls = useRef();
  const refTarget = useRef(new Vector3(0, 0, 0));
  const { setCurveProps } = useCurve();
  const timer = useRef(0);

  useEffect(() => {
    timer.current = 0;
    if (activePlanet) {
      let endPos = calculatePosition(
        activePlanet.angle,
        activePlanet.orbitRadius - activePlanet.geometry.parameters.radius * 3,
        activePlanet.position.y
      );

      const curve = {
        startPos: camera.position,
        endPos: new Vector3(...endPos),
      };

        setCameraLookAt(
          new Vector3(
            activePlanet.orbitRadius *
              Math.cos(
                (activePlanet.angle -
                  (9 + activePlanet.geometry.parameters.radius / 2) *
                    (10 / activePlanet.orbitRadius)) *
                  (Math.PI / 180)
              ),
            activePlanet.position.y,
            activePlanet.orbitRadius *
              Math.sin(
                (activePlanet.angle -
                  (9 + activePlanet.geometry.parameters.radius / 2) *
                    (10 / activePlanet.orbitRadius)) *
                  (Math.PI / 180)
              )
          )
        );
      console.log(activePlanet.orbitRadius);

      useMin.current = activePlanet.planetRadius + 1;
      setCurveProps(curve);
    } else {
      setCameraLookAt(new Vector3(0, 0, 0));
      setCurveProps({
        startPos: camera.position,
        endPos: new Vector3(0, 250, 0),
      });
      useMin.current = 0;
    }
  }, [activePlanet]);

  useFrame((state, delta) => {
    refTarget.current.lerp(cameraLookAt, delta);
    refControls.current.target = refTarget.current;
  });

  return (
    <OrbitControls
      ref={refControls}
      camera={camera}
      minDistance={useMin.current}
    />
  );
}
