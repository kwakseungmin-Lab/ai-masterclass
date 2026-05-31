import * as THREE from "three";
import {
  randomFloat,
  randomInt,
  randomChoice,
  HALF_BOARD,
  GROUND_WIDTH,
} from "../utils.ts";
import { createLogMesh } from "../vehicles.ts";
import type { Collidable } from "../collision.ts";

interface Log {
  readonly mesh: THREE.Group;
  readonly speed: number;
  readonly direction: 1 | -1;
  readonly length: number;
  readonly halfW: number;
  readonly halfD: number;
  x: number;
  readonly z: number;
}

export interface RiverRow {
  readonly type: "river";
  readonly z: number;
  readonly group: THREE.Group;
  readonly logs: Log[];
  readonly spawnTimer: { value: number };
  readonly spawnInterval: number;
  readonly direction: 1 | -1;
  readonly speed: number;
}

export function createRiverRow(z: number, scene: THREE.Scene): RiverRow {
  const group = new THREE.Group();

  const water = new THREE.Mesh(
    new THREE.BoxGeometry(GROUND_WIDTH, 0.1, 1),
    new THREE.MeshLambertMaterial({
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.7,
      flatShading: true,
    })
  );
  water.position.set(0, -0.05, z);
  group.add(water);

  scene.add(group);

  const direction: 1 | -1 = randomChoice([1, -1]);
  const speed = randomFloat(1.5, 3.0);

  const row: RiverRow = {
    type: "river",
    z,
    group,
    logs: [],
    spawnTimer: { value: 0 },
    spawnInterval: randomFloat(2.0, 4.0),
    direction,
    speed,
  };

  const numInitial = randomInt(2, 3);
  for (let i = 0; i < numInitial; i++) {
    const logLen = randomInt(3, 5);
    const logMesh = createLogMesh(logLen);
    const spacing = (HALF_BOARD * 2) / (numInitial + 1);
    const xPos = -HALF_BOARD + spacing * (i + 1);

    logMesh.position.set(xPos, 0, z);
    scene.add(logMesh);

    row.logs.push({
      mesh: logMesh,
      speed,
      direction,
      length: logLen,
      halfW: (logLen * 0.9) / 2,
      halfD: 0.3,
      x: xPos,
      z,
    });
  }

  return row;
}

function spawnLog(row: RiverRow, scene: THREE.Scene): void {
  const logLen = randomInt(3, 5);
  const mesh = createLogMesh(logLen);
  const startX =
    row.direction === 1
      ? -(HALF_BOARD + logLen)
      : HALF_BOARD + logLen;

  mesh.position.set(startX, 0, row.z);
  scene.add(mesh);

  row.logs.push({
    mesh,
    speed: row.speed,
    direction: row.direction,
    length: logLen,
    halfW: (logLen * 0.9) / 2,
    halfD: 0.3,
    x: startX,
    z: row.z,
  });
}

export function updateRiverRow(
  row: RiverRow,
  dt: number,
  scene: THREE.Scene
): void {
  row.spawnTimer.value += dt;
  if (row.spawnTimer.value >= row.spawnInterval) {
    row.spawnTimer.value = 0;
    spawnLog(row, scene);
  }

  const removeIndices: number[] = [];
  for (let i = 0; i < row.logs.length; i++) {
    const log = row.logs[i];
    const newX = log.x + log.direction * log.speed * dt;
    (log as { x: number }).x = newX;
    log.mesh.position.x = newX;

    if (Math.abs(newX) > HALF_BOARD + log.length + 3) {
      removeIndices.push(i);
    }
  }

  for (let i = removeIndices.length - 1; i >= 0; i--) {
    const idx = removeIndices[i];
    const log = row.logs[idx];
    scene.remove(log.mesh);
    log.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
    });
    row.logs.splice(idx, 1);
  }
}

export function getRiverLogsAsCollidables(row: RiverRow): Collidable[] {
  return row.logs.map((l) => ({
    x: l.x,
    z: l.z,
    halfW: l.halfW,
    halfD: l.halfD,
  }));
}

export function getRiverLogSpeed(row: RiverRow): number {
  return row.speed * row.direction;
}

export function removeRiverRow(row: RiverRow, scene: THREE.Scene): void {
  scene.remove(row.group);
  row.group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      if (child.material instanceof THREE.Material) {
        child.material.dispose();
      }
    }
  });
  for (const log of row.logs) {
    scene.remove(log.mesh);
    log.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
    });
  }
}
