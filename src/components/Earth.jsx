import { useFrame, useLoader } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import { AdditiveBlending, BackSide, Color, Vector3 } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import EarthCloudsTexture from '../textures/Earth_Clouds.png';
import EarthDayTexture from '../textures/Earth_Day.jpg';
import EarthNigthTexture from '../textures/Earth_Night.jpg';
import { calculatePosition } from '../utils/utils';
import Ecliptic from './Ecliptic';

export default function Earth(props) {
  const { planetRadius, orbitRadius, angle } = props;
  const [colorMap, nightMap, cloudsMap] = useLoader(TextureLoader, [
    EarthDayTexture,
    EarthNigthTexture,
    EarthCloudsTexture,
  ]);
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const cloudsRef = useRef();
  const planetRef = useRef();
  const handleClick = (e) => {
    e.stopPropagation();
    setActivePlanet(planetRef.current);
  };

  const pos = calculatePosition(angle, orbitRadius);

  useEffect(() => {
    setPlanets(planetRef.current);
  }, []);

  useFrame(() => {
    cloudsRef.current.rotation.y += 0.0002;
  });

  const uniforms = useMemo(() => {
    return {
      uSun: {
        value: new Vector3(0.01, 0, 0.01),
      },
      uDay: {
        value: colorMap,
      },
      uNight: {
        value: nightMap,
      },
    };
  }, []);

  const atmUniforms = useMemo(
    () => ({
      c: {
        value: 0.85,
      },
      p: {
        value: 10,
      },
      glowColor: {
        value: new Color('#1e296f'),
      },
    }),
    []
  );

  return (
    <group>
      <mesh position={pos}>
        <sphereGeometry args={[planetRadius + 0.02, 64, 64]} />
        <shaderMaterial
          args={[
            {
              uniforms: atmUniforms,
              vertexShader: `
              varying vec3 vWordPos;
        varying vec3 vNormal;
        void main () {
          vNormal = normalize(normalMatrix * normal);
          vWordPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
          `,
              fragmentShader: `
              uniform vec3 glowColor;
        uniform float c;
        uniform float p;
        varying vec3 vWordPos;
        varying vec3 vNormal;
        void main () {

          vec3 lightDirection = normalize(vec3(0., 0., 0.) - vWordPos);
          float diffuse = dot(lightDirection, vNormal); 

          vec3 wCameraToVertex = vWordPos - cameraPosition;
          vec3 viewCameraTovertex = (viewMatrix * vec4(wCameraToVertex, 0.0)).xyz;
          viewCameraTovertex = normalize(viewCameraTovertex);
          float intensity = pow(c + dot(vNormal, viewCameraTovertex), p);
          gl_FragColor = vec4(glowColor, intensity);
        }
          `,
              blending: AdditiveBlending,
              side: BackSide,
              transparent: true,
            },
          ]}
        />
      </mesh>
      <mesh position={pos} ref={cloudsRef}>
        <sphereGeometry args={[planetRadius + 0.015, 64, 64]} />
        <meshPhongMaterial map={cloudsMap} transparent />
      </mesh>
      <mesh
        {...props}
        position={pos}
        name="Earth"
        ref={planetRef}
        onClick={handleClick}
      >
        <sphereGeometry args={[planetRadius, 100, 100]} />
        <shaderMaterial
          args={[
            {
              extensions: {
                derivatives: true,
              },
              uniforms: uniforms,
              vertexShader: `
              varying vec2 vUv;
              varying vec3 vNormal;
              varying vec3 vPos;
              varying vec3 vPosition;
              
              void main() {
                vPos = (modelMatrix * vec4(position, 1.0 )).xyz;
                vPosition = position;
                vUv = uv;
                vNormal = normal;

                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * mvPosition;
              }
              `,
              fragmentShader: `
                uniform sampler2D uDay;
                uniform sampler2D uNight;
                uniform vec3 uSun;
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPos;
                varying vec3 vPosition;

                vec4 toLinear(vec4 sRGB) {
                  bvec4 cutoff = lessThan(sRGB, vec4(0.04045));
                  vec4 higher = pow((sRGB + vec4(0.055))/vec4(1.055), vec4(2.4));
                  vec4 lower = sRGB/vec4(12.92);

                  return mix(higher, lower, cutoff);
                }

                void main() {
                  vec4 ambient = vec4(1., 1., 1., 1.);
                  vec3 dayColor = texture2D(uDay, vUv).rgb;
                  vec3 nightColor = texture2D(uNight, vUv).rgb;

                  float diff = dot(vNormal, normalize(uSun - vPos));

                  float specularLight = 0.9;
                  vec3 viewDirection = normalize(cameraPosition - vPos);
                  vec3 reflectionDirection = reflect(uSun, vNormal);
                  float specularAmount = pow(max(dot(viewDirection, reflectionDirection), 0.), 8.);
                  float specular = specularAmount * specularLight;

                  vec3 result = mix(nightColor, dayColor, diff);

                  // gl_FragColor = toLinear(vec4(result, 1.));
                  gl_FragColor = vec4(result, 1.);
                }
              `,
            },
          ]}
        />
      </mesh>
      <Ecliptic xRadius={orbitRadius} zRadius={orbitRadius} />
    </group>
  );
}
