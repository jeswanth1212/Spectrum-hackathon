import { ReactNode } from 'react';
import * as THREE from 'three';

export interface RainbowMaterialUniforms {
  [uniform: string]: THREE.IUniform<number | THREE.Vector3 | THREE.Matrix4>;
  time: THREE.IUniform<number>;
  speed: THREE.IUniform<number>;
  fade: THREE.IUniform<number>;
  startRadius: THREE.IUniform<number>;
  endRadius: THREE.IUniform<number>;
  emissiveIntensity: THREE.IUniform<number>;
  ratio: THREE.IUniform<number>;
}

export interface RainbowMaterialType extends THREE.ShaderMaterial {
  uniforms: RainbowMaterialUniforms;
  time: number;
  speed: number;
}

interface RainbowMaterialCustomProps {
  fade?: number;
  startRadius?: number;
  endRadius?: number;
  ratio?: number;
  toneMapped?: boolean;
  ref?: React.RefObject<RainbowMaterialType | null>;
  key?: string;
  attach?: string;
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    rainbowMaterial: THREE.ShaderMaterialParameters & RainbowMaterialCustomProps;
  }
}

export type MeshWithRayEvents = {
  onRayOver?: (event: RayEvent) => void;
  onRayOut?: (event: RayEvent) => void;
  onRayMove?: (event: RayMoveEvent) => void;
  visible?: boolean;
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  renderOrder?: number;
  dispose?: null;
  ref?: React.RefObject<THREE.Mesh>;
};

export interface BeamProps {
  children?: ReactNode;
  start?: [number, number, number];
  end?: [number, number, number];
  bounce?: number;
  far?: number;
  position?: [number, number, number];
  stride?: number;
  width?: number;
  [key: string]: unknown;
}

export interface RainbowProps {
  startRadius?: number;
  endRadius?: number;
  emissiveIntensity?: number;
  fade?: number;
  position?: [number, number, number];
  scale?: [number, number, number];
  visible?: boolean;
}

export interface FlareProps {
  streak?: [number, number, number];
  visible?: boolean;
  [key: string]: unknown;
}

export interface BoxProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  [key: string]: unknown;
}

export interface PrismProps {
  onRayOver?: (event: RayEvent) => void;
  onRayOut?: (event: RayEvent) => void;
  onRayMove?: (event: RayMoveEvent) => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  [key: string]: unknown;
}

export interface RayEvent {
  stopPropagation: () => void;
}

export interface RayMoveEvent {
  api: {
    positions: Float32Array;
    number: number;
  };
  position: THREE.Vector3;
  direction: THREE.Vector3;
  normal: THREE.Vector3;
} 