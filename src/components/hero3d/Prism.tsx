import { useLoader } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import { MeshWithRayEvents, RayEvent, RayMoveEvent } from './types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

interface PrismProps {
  onRayOver?: (event: RayEvent) => void;
  onRayOut?: (event: RayEvent) => void;
  onRayMove?: (event: RayMoveEvent) => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  [key: string]: unknown;
}

interface GLTFResult {
  nodes: {
    [key: string]: THREE.Mesh;
  };
}

export function Prism({ onRayOver, onRayOut, onRayMove, ...props }: PrismProps) {
  const gltf = useLoader(GLTFLoader, '/gltf/prism.glb') as unknown as GLTFResult;
  const { nodes } = gltf;
  const spectrumRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (spectrumRef.current?.material) {
      const material = spectrumRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms?.time) {
        material.uniforms.time.value = state.clock.elapsedTime * 0.5;
      }
    }
    if (linesRef.current?.material) {
      const material = linesRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms?.time) {
        material.uniforms.time.value = state.clock.elapsedTime * 0.5;
      }
    }
  });

  const raycasterMeshProps: MeshWithRayEvents = {
    visible: false,
    scale: 1.9,
    rotation: [Math.PI / 2, Math.PI, 0],
    onRayOver,
    onRayOut,
    onRayMove
  };

  // Custom shader for rainbow effect
  const spectrumShader = {
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec2 vUv;
      
      vec3 rainbow(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d + time * 0.25));
      }
      
      void main() {
        vec3 color = rainbow(vUv.y);
        gl_FragColor = vec4(color, 0.8);
      }
    `
  } as const;

  // Custom shader for internal lines
  const linesShader = {
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;

      float line(vec2 p, vec2 a, vec2 b) {
        vec2 pa = p - a;
        vec2 ba = b - a;
        float t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        float dist = length(pa - ba * t);
        return smoothstep(0.04, 0.01, dist);
      }

      void main() {
        vec2 center = vec2(0.5, 0.5);
        vec2 pos = vUv;
        
        // Define triangle vertices in UV space
        vec2 v1 = vec2(0.5, 0.9);  // top
        vec2 v2 = vec2(0.1, 0.1);  // bottom left
        vec2 v3 = vec2(0.9, 0.1);  // bottom right
        
        // Calculate lines with enhanced pulsing effect
        float pulse = (sin(time * 1.5) * 0.3 + 0.7);
        float line1 = line(pos, center, v1) * pulse;
        float line2 = line(pos, center, v2) * pulse;
        float line3 = line(pos, center, v3) * pulse;
        
        // Combine lines with enhanced glowing effect
        float lines = (line1 + line2 + line3) * 1.5;
        
        // Enhanced color variation
        vec3 color1 = vec3(0.4, 0.8, 1.0);  // Brighter blue
        vec3 color2 = vec3(1.0, 0.4, 0.8);  // Brighter pink
        vec3 baseColor = mix(color1, color2, sin(time) * 0.5 + 0.5);
        
        // Enhanced glow effect
        float glow = exp(-lines) * 0.8;
        vec3 glowColor = baseColor * 1.5;
        
        // Combine for final color with enhanced visibility
        vec3 finalColor = mix(baseColor, glowColor, glow) * (lines + glow);
        finalColor *= 1.5;
        
        gl_FragColor = vec4(finalColor, min(lines * 0.95 + glow * 0.3, 1.0));
      }
    `
  } as const;

  if (!nodes?.Cone?.geometry) {
    return null;
  }

  return (
    <group {...props}>
      {/* A low-res, invisible representation of the prism that gets hit by the raycaster */}
      <mesh {...raycasterMeshProps}>
        <cylinderGeometry args={[1, 1, 1, 3, 1]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {/* Glowing border mesh - outer layer */}
      <mesh position={[0, 0, 0.6]} renderOrder={9} scale={2.04} dispose={null} geometry={nodes.Cone.geometry}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Glowing border mesh - inner layer */}
      <mesh position={[0, 0, 0.6]} renderOrder={9} scale={2.02} dispose={null} geometry={nodes.Cone.geometry}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Internal spectrum effect */}
      <mesh 
        ref={spectrumRef}
        position={[0, 0, 0.6]} 
        renderOrder={7} 
        scale={1.95} 
        dispose={null} 
        geometry={nodes.Cone.geometry}
      >
        <shaderMaterial
          {...spectrumShader}
          transparent
          side={THREE.FrontSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* The visible hi-res prism */}
      <mesh position={[0, 0, 0.6]} renderOrder={10} scale={2} dispose={null} geometry={nodes.Cone.geometry}>
        <MeshTransmissionMaterial
          clearcoat={0.8}
          transmission={0.95}
          thickness={0.5}
          roughness={0.01}
          anisotropy={1.5}
          chromaticAberration={0.8}
          toneMapped={true}
          distortion={0.5}
          distortionScale={0.8}
          temporalDistortion={0.2}
          ior={2.4}
          color="#ffffff"
          attenuationDistance={3.0}
          attenuationColor="#ffffff"
          reflectivity={0.7}
          metalness={0.4}
          transparent={true}
          opacity={0.98}
          resolution={1024}
          samples={16}
          backsideThickness={1}
          backsideResolution={512}
        />
      </mesh>
      {/* Internal reflections mesh */}
      <mesh position={[0, 0, 0.6]} renderOrder={8} scale={1.98} dispose={null} geometry={nodes.Cone.geometry}>
        <meshPhysicalMaterial
          transparent
          opacity={0.4}
          metalness={0.8}
          roughness={0.01}
          clearcoat={2.0}
          clearcoatRoughness={0.02}
          side={THREE.FrontSide}
          color="#ffffff"
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Internal connecting lines */}
      <mesh 
        ref={linesRef}
        position={[0, 0, 0.6]} 
        renderOrder={12}
        scale={1.96} 
        dispose={null} 
        geometry={nodes.Cone.geometry}
      >
        <shaderMaterial
          {...linesShader}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={true}
        />
      </mesh>
    </group>
  );
} 