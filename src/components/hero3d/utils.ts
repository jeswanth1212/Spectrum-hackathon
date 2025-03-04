import * as THREE from 'three';

export function lerp(object: Record<string, number> | THREE.Light, prop: string, goal: number, speed = 0.1) {
  if (object instanceof THREE.Light && prop === 'intensity') {
    object.intensity = THREE.MathUtils.lerp(object.intensity, goal, speed);
  } else if (!(object instanceof THREE.Light)) {
    object[prop] = THREE.MathUtils.lerp(object[prop], goal, speed);
  }
}

const color = new THREE.Color();
export function lerpC(value: THREE.Color, goal: string | number | THREE.Color, speed = 0.1) {
  value.lerp(color.set(goal), speed);
}

const vector = new THREE.Vector3();
export function lerpV3(value: THREE.Vector3, goal: [number, number, number], speed = 0.1) {
  value.lerp(vector.set(...goal), speed);
}

export function calculateRefractionAngle(incidentAngle: number, glassIor = 2.5, airIor = 1.000293) {
  const theta = Math.asin((airIor * Math.sin(incidentAngle)) / glassIor) || 0;
  return theta;
}

export function getPointerEventPosition(event: PointerEvent | MouseEvent): THREE.Vector2 {
  return new THREE.Vector2(event.clientX, event.clientY);
} 