import * as THREE from "three";
import { createChickenMesh } from "./vehicles.ts";
import { clampX } from "./utils.ts";

const HOP_DURATION = 0.1;
const HOP_HEIGHT = 0.3;

export type Direction = "forward" | "backward" | "left" | "right";

export interface PlayerState {
  readonly x: number;
  readonly z: number;
  readonly y: number;
  readonly targetX: number;
  readonly targetZ: number;
  readonly isHopping: boolean;
  readonly hopProgress: number;
  readonly startX: number;
  readonly startZ: number;
  readonly mesh: THREE.Group;
  readonly maxZ: number;
  readonly facingAngle: number;
}

export function createPlayer(scene: THREE.Scene): PlayerState {
  const mesh = createChickenMesh();
  mesh.position.set(0, 0, 0);
  scene.add(mesh);

  return {
    x: 0,
    z: 0,
    y: 0,
    targetX: 0,
    targetZ: 0,
    isHopping: false,
    hopProgress: 0,
    startX: 0,
    startZ: 0,
    mesh,
    maxZ: 0,
    facingAngle: 0,
  };
}

export function startHop(state: PlayerState, dir: Direction): PlayerState {
  if (state.isHopping) return state;

  let dx = 0;
  let dz = 0;
  let angle = state.facingAngle;

  switch (dir) {
    case "forward":
      dz = -1;
      angle = 0;
      break;
    case "backward":
      dz = 1;
      angle = Math.PI;
      break;
    case "left":
      dx = -1;
      angle = Math.PI / 2;
      break;
    case "right":
      dx = 1;
      angle = -Math.PI / 2;
      break;
  }

  const newTargetX = clampX(state.x + dx);
  const newTargetZ = state.z + dz;

  return {
    ...state,
    targetX: newTargetX,
    targetZ: newTargetZ,
    startX: state.x,
    startZ: state.z,
    isHopping: true,
    hopProgress: 0,
    facingAngle: angle,
  };
}

export function updatePlayer(state: PlayerState, dt: number): PlayerState {
  if (!state.isHopping) {
    state.mesh.position.set(state.x, state.y, state.z);
    state.mesh.rotation.y = state.facingAngle;
    return state;
  }

  const newProgress = Math.min(1, state.hopProgress + dt / HOP_DURATION);
  const t = newProgress;

  const currentX = state.startX + (state.targetX - state.startX) * t;
  const currentZ = state.startZ + (state.targetZ - state.startZ) * t;
  const currentY = HOP_HEIGHT * Math.sin(t * Math.PI);

  state.mesh.position.set(currentX, currentY, currentZ);
  state.mesh.rotation.y = state.facingAngle;

  if (newProgress >= 1) {
    const newMaxZ = Math.min(state.maxZ, state.targetZ);
    return {
      ...state,
      x: state.targetX,
      z: state.targetZ,
      y: 0,
      isHopping: false,
      hopProgress: 0,
      maxZ: newMaxZ,
    };
  }

  return {
    ...state,
    hopProgress: newProgress,
    y: currentY,
  };
}

export function getPlayerScore(state: PlayerState): number {
  return Math.abs(Math.min(0, state.maxZ));
}

export function resetPlayer(state: PlayerState): PlayerState {
  state.mesh.position.set(0, 0, 0);
  state.mesh.rotation.y = Math.PI;
  return {
    ...state,
    x: 0,
    z: 0,
    y: 0,
    targetX: 0,
    targetZ: 0,
    isHopping: false,
    hopProgress: 0,
    startX: 0,
    startZ: 0,
    maxZ: 0,
    facingAngle: 0,
  };
}

export function setPlayerPosition(
  state: PlayerState,
  x: number,
  z: number
): PlayerState {
  return { ...state, x, z };
}
