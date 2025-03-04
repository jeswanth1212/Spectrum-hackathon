import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Reflect } from './Reflect';

interface BeamProps {
  children?: ReactNode;
  bounce?: number;
  far?: number;
  position?: [number, number, number];
  stride?: number;
  width?: number;
}

interface RayHit {
  key: string;
  intersect: THREE.Intersection;
  stopped: boolean;
}

export interface ReflectRef {
  number: number;
  objects: THREE.Object3D[];
  hits: Map<string, RayHit>;
  start: THREE.Vector3;
  end: THREE.Vector3;
  raycaster: THREE.Raycaster;
  positions: Float32Array;
  setRay: (start?: [number, number, number], end?: [number, number, number]) => void;
  update: () => number;
}

const Beam = forwardRef<ReflectRef, BeamProps>(
  ({ children, bounce = 15, far = 25, position = [0, 0, 0], stride = 2, width = 6 }, ref) => {
    const streaks = useRef<THREE.InstancedMesh>(null);
    const glow = useRef<THREE.InstancedMesh>(null);
    const reflect = useRef<ReflectRef>(null);
    const [streakTexture, glowTexture] = useTexture([
      '/textures/lensflare/lensflare2.png',
      '/textures/lensflare/lensflare0_bw.jpg'
    ]);

    const obj = new THREE.Object3D();
    const f = new THREE.Vector3();
    const t = new THREE.Vector3();
    const n = new THREE.Vector3();
    const config = {
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      opacity: 1.0
    };

    useFrame(() => {
      if (!streaks.current || !glow.current || !reflect.current) return;
      const range = reflect.current.update() - 1;

      // Optimize streak updates
      for (let i = 0; i < range; i++) {
        f.fromArray(reflect.current.positions, i * 3);
        t.fromArray(reflect.current.positions, i * 3 + 3);
        n.subVectors(t, f).normalize();
        obj.position.copy(f).add(t).multiplyScalar(0.5);
        obj.scale.set(t.distanceTo(f) * stride, width, 1);
        obj.rotation.z = Math.atan2(n.y, n.x);
        obj.updateMatrix();
        streaks.current.setMatrixAt(i, obj.matrix);
      }

      streaks.current.count = range;
      streaks.current.instanceMatrix.needsUpdate = true;

      // Optimize glow updates
      obj.scale.setScalar(0);
      obj.updateMatrix();
      glow.current.setMatrixAt(0, obj.matrix);

      for (let i = 1; i < range; i++) {
        obj.position.fromArray(reflect.current.positions, i * 3);
        obj.scale.setScalar(0.8);  // Reduced glow scale for faster updates
        obj.rotation.set(0, 0, 0);
        obj.updateMatrix();
        glow.current.setMatrixAt(i, obj.matrix);
      }

      glow.current.count = range;
      glow.current.instanceMatrix.needsUpdate = true;
    });

    useImperativeHandle(ref, () => {
      if (!reflect.current) {
        throw new Error('Reflect component not initialized');
      }
      return reflect.current;
    }, []);

    return (
      <group position={position}>
        <Reflect ref={reflect} bounce={bounce} far={far}>
          {children}
        </Reflect>
        <instancedMesh ref={streaks} args={[undefined, undefined, 100]} instanceMatrix-usage={THREE.DynamicDrawUsage}>
          <planeGeometry />
          <meshBasicMaterial map={streakTexture} {...config} opacity={1.0} />
        </instancedMesh>
        <instancedMesh ref={glow} args={[undefined, undefined, 100]} instanceMatrix-usage={THREE.DynamicDrawUsage}>
          <planeGeometry />
          <meshBasicMaterial map={glowTexture} {...config} opacity={0.8} />
        </instancedMesh>
      </group>
    );
  }
);

Beam.displayName = 'Beam';

export { Beam };
export type { BeamProps }; 