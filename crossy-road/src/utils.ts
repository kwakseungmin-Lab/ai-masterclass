import * as THREE from "three";

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomColor(): number {
  const colors = [
    0xe74c3c, 0x3498db, 0x2ecc71, 0xf39c12, 0x9b59b6, 0x1abc9c,
    0xe67e22, 0x2980b9, 0x27ae60, 0xc0392b, 0x8e44ad, 0xf1c40f,
  ];
  return randomChoice(colors);
}

export function createLambertMaterial(color: number): THREE.MeshLambertMaterial {
  return new THREE.MeshLambertMaterial({ color, flatShading: true });
}

export interface AABB {
  readonly minX: number;
  readonly maxX: number;
  readonly minZ: number;
  readonly maxZ: number;
}

export function getAABB(
  x: number,
  z: number,
  halfW: number,
  halfD: number
): AABB {
  return {
    minX: x - halfW,
    maxX: x + halfW,
    minZ: z - halfD,
    maxZ: z + halfD,
  };
}

export function aabbOverlap(a: AABB, b: AABB): boolean {
  return a.minX < b.maxX && a.maxX > b.minX && a.minZ < b.maxZ && a.maxZ > b.minZ;
}

export const LANE_WIDTH = 1;
export const HALF_BOARD = 4;
export const GROUND_WIDTH = 30;

export function clampX(x: number): number {
  return Math.max(-HALF_BOARD, Math.min(HALF_BOARD, x));
}
