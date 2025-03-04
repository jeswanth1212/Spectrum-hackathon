import * as THREE from 'three';
import { forwardRef, useRef, useMemo, useLayoutEffect, useImperativeHandle, ReactNode } from 'react';
import { invalidate } from '@react-three/fiber';
import { MeshWithRayEvents, RayEvent, RayMoveEvent } from './types';

interface ReflectProps {
  children?: ReactNode;
  start?: [number, number, number];
  end?: [number, number, number];
  bounce?: number;
  far?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

interface RayApi {
  number: number;
  objects: THREE.Object3D[];
  hits: Map<string, RayHit>;
  start: THREE.Vector3;
  end: THREE.Vector3;
  raycaster: THREE.Raycaster;
  positions: Float32Array;
  setRay: (_start?: [number, number, number], _end?: [number, number, number]) => void;
  update: () => number;
}

interface RayHit {
  key: string;
  intersect: THREE.Intersection;
  stopped: boolean;
}

interface ExtendedIntersection extends THREE.Intersection {
  direction?: THREE.Vector3;
  reflect?: THREE.Vector3;
}

function isRayMesh(object: THREE.Object3D): object is THREE.Mesh & MeshWithRayEvents {
  return object instanceof THREE.Mesh && (
    'onRayOver' in object ||
    'onRayOut' in object ||
    'onRayMove' in object
  );
}

function createRayEvent(api: RayApi, hit: RayHit): RayEvent {
  return {
    stopPropagation: () => (hit.stopped = true)
  };
}

function createRayMoveEvent(api: RayApi, hit: RayHit, intersect: ExtendedIntersection): RayMoveEvent {
  return {
    api,
    position: intersect.point as THREE.Vector3,
    direction: intersect.direction || new THREE.Vector3(),
    normal: intersect.face?.normal || new THREE.Vector3()
  };
}

export const Reflect = forwardRef<RayApi, ReflectProps>(({ children, start: _start = [0, 0, 0], end: _end = [0, 0, 0], bounce = 10, far = 100, ...props }, fRef) => {
  bounce = (bounce || 1) + 1;

  const scene = useRef<THREE.Group>(null);
  const vStart = useMemo(() => new THREE.Vector3(), []);
  const vEnd = useMemo(() => new THREE.Vector3(), []);
  const vDir = useMemo(() => new THREE.Vector3(), []);
  const vPos = useMemo(() => new THREE.Vector3(), []);

  const api: RayApi = useMemo(() => ({
    number: 0,
    objects: [],
    hits: new Map(),
    start: new THREE.Vector3(),
    end: new THREE.Vector3(),
    raycaster: new THREE.Raycaster(),
    positions: new Float32Array(Array.from({ length: (bounce + 10) * 3 }, () => 0)),
    setRay: (_start: [number, number, number] = [0, 0, 0], _end: [number, number, number] = [0, 0, 0]) => {
      api.start.set(_start[0], _start[1], _start[2]);
      api.end.set(_end[0], _end[1], _end[2]);
    },
    update: (): number => {
      api.number = 0;
      const intersects: ExtendedIntersection[] = [];
      let intersect: ExtendedIntersection | null = null;

      vStart.copy(api.start);
      vEnd.copy(api.end);
      vDir.subVectors(vEnd, vStart).normalize();
      vStart.toArray(api.positions, api.number++ * 3);

      while (true) {
        api.raycaster.set(vStart, vDir);
        intersect = api.raycaster.intersectObjects(api.objects, false)[0] as ExtendedIntersection;
        if (api.number < bounce && intersect && intersect.face) {
          intersects.push(intersect);
          intersect.direction = vDir.clone();
          intersect.point.toArray(api.positions, api.number++ * 3);
          vDir.reflect(intersect.object.localToWorld(intersect.face.normal).sub(intersect.object.getWorldPosition(vPos)).normalize());
          intersect.reflect = vDir.clone();
          vStart.copy(intersect.point);
        } else {
          vEnd.addVectors(vStart, vDir.multiplyScalar(far)).toArray(api.positions, api.number++ * 3);
          break;
        }
      }

      api.number = 1;
      api.hits.forEach((hit) => {
        if (!intersects.find((intersect) => intersect.object.uuid === hit.key)) {
          api.hits.delete(hit.key);
          const obj = hit.intersect.object as THREE.Mesh & MeshWithRayEvents;
          if (obj.onRayOut) {
            invalidate();
            obj.onRayOut(createRayEvent(api, hit));
          }
        }
      });

      for (intersect of intersects) {
        api.number++;
        if (!api.hits.has(intersect.object.uuid)) {
          const hit: RayHit = { key: intersect.object.uuid, intersect, stopped: false };
          api.hits.set(intersect.object.uuid, hit);
          const obj = intersect.object as THREE.Mesh & MeshWithRayEvents;
          if (obj.onRayOver) {
            invalidate();
            obj.onRayOver(createRayEvent(api, hit));
          }
        }

        const hit = api.hits.get(intersect.object.uuid)!;
        const obj = intersect.object as THREE.Mesh & MeshWithRayEvents;

        if (obj.onRayMove) {
          invalidate();
          obj.onRayMove(createRayMoveEvent(api, hit, intersect));
        }

        if (hit.stopped) break;
        if (intersect === intersects[intersects.length - 1]) api.number++;
      }
      return Math.max(2, api.number);
    }
  }), [bounce, far, vStart, vEnd, vDir, vPos]);

  useLayoutEffect(() => {
    api.setRay(_start, _end);
  }, [api, _start, _end]);

  useImperativeHandle(fRef, () => api, [api]);

  useLayoutEffect(() => {
    api.objects = [];
    if (scene.current) {
      scene.current.traverse((object) => {
        if (isRayMesh(object)) api.objects.push(object);
      });
      scene.current.updateWorldMatrix(true, true);
    }
  });

  return (
    <group ref={scene} {...props}>
      {children}
    </group>
  );
});

Reflect.displayName = 'Reflect'; 