import React, { useRef } from 'react';

export default function Lights() {
  const ref = useRef();
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight
        ref={ref}
        color={'#ffffff'}
        intensity={1}
        position={[0, 0, 0]}
        castShadow
        decay={2}
        shadow-bias={-0.0001}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-blurSamples={30}
      />
    </>
  );
}
