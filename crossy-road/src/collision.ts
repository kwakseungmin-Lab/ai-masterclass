import type { AABB } from "./utils.ts";
import { getAABB, aabbOverlap } from "./utils.ts";

export interface Collidable {
  readonly x: number;
  readonly z: number;
  readonly halfW: number;
  readonly halfD: number;
}

export function checkCollision(a: Collidable, b: Collidable): boolean {
  const boxA: AABB = getAABB(a.x, a.z, a.halfW, a.halfD);
  const boxB: AABB = getAABB(b.x, b.z, b.halfW, b.halfD);
  return aabbOverlap(boxA, boxB);
}

export function isOnPlatform(
  playerX: number,
  playerZ: number,
  platforms: readonly Collidable[]
): boolean {
  const playerBox: AABB = getAABB(playerX, playerZ, 0.3, 0.3);
  for (const plat of platforms) {
    const platBox: AABB = getAABB(plat.x, plat.z, plat.halfW, plat.halfD);
    if (aabbOverlap(playerBox, platBox)) {
      return true;
    }
  }
  return false;
}

export function getCarryingPlatform(
  playerX: number,
  playerZ: number,
  platforms: readonly Collidable[]
): Collidable | null {
  const playerBox: AABB = getAABB(playerX, playerZ, 0.3, 0.3);
  for (const plat of platforms) {
    const platBox: AABB = getAABB(plat.x, plat.z, plat.halfW, plat.halfD);
    if (aabbOverlap(playerBox, platBox)) {
      return plat;
    }
  }
  return null;
}
