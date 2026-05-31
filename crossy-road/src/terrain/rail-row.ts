import * as THREE from "three";
import {
  createLambertMaterial,
  randomFloat,
  randomChoice,
  HALF_BOARD,
  GROUND_WIDTH,
} from "../utils.ts";
import { createTrainMesh } from "../vehicles.ts";
import type { Collidable } from "../collision.ts";

interface Train {
  readonly mesh: THREE.Group;
  readonly speed: number;
  readonly direction: 1 | -1;
  readonly halfW: number;
  readonly halfD: number;
  x: number;
  readonly z: number;
  readonly active: boolean;
}

export interface RailRow {
  readonly type: "rail";
  readonly z: number;
  readonly group: THREE.Group;
  readonly train: Train | null;
  readonly warning: boolean;
  readonly warningTimer: { value: number };
  readonly spawnCooldown: { value: number };
  readonly direction: 1 | -1;
  readonly warningLight: THREE.Mesh;
}

export function createRailRow(z: number, scene: THREE.Scene): RailRow {
  const group = new THREE.Group();

  const ground = new THREE.Mesh(
    new THREE.BoxGeometry(GROUND_WIDTH, 0.1, 1),
    createLambertMaterial(0x777777)
  );
  ground.position.set(0, -0.05, z);
  group.add(ground);

  const railMat = createLambertMaterial(0x888888);
  for (const offset of [-0.15, 0.15]) {
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(GROUND_WIDTH, 0.03, 0.04),
      railMat
    );
    rail.position.set(0, 0.02, z + offset);
    group.add(rail);
  }

  const sleeperMat = createLambertMaterial(0x654321);
  for (let sx = -HALF_BOARD; sx <= HALF_BOARD; sx += 0.8) {
    const sleeper = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.02, 0.5),
      sleeperMat
    );
    sleeper.position.set(sx, 0.01, z);
    group.add(sleeper);
  }

  const warningLight = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.4, 0.15),
    createLambertMaterial(0x444444)
  );
  warningLight.position.set(-HALF_BOARD - 0.5, 0.2, z);
  group.add(warningLight);

  scene.add(group);

  return {
    type: "rail",
    z,
    group,
    train: null,
    warning: false,
    warningTimer: { value: randomFloat(5, 12) },
    spawnCooldown: { value: 0 },
    direction: randomChoice([1, -1]),
    warningLight,
  };
}

export function updateRailRow(
  row: RailRow,
  dt: number,
  scene: THREE.Scene
): RailRow {
  let newTrain = row.train;
  let newWarning = row.warning;

  row.warningTimer.value -= dt;

  if (!row.warning && row.warningTimer.value <= 0 && !row.train) {
    newWarning = true;
    row.spawnCooldown.value = 1.5;
    (row.warningLight.material as THREE.MeshLambertMaterial).color.setHex(
      0xff0000
    );
  }

  if (newWarning && !row.train) {
    row.spawnCooldown.value -= dt;

    const blinkRate = Math.sin(Date.now() * 0.02) > 0;
    (row.warningLight.material as THREE.MeshLambertMaterial).color.setHex(
      blinkRate ? 0xff0000 : 0x440000
    );

    if (row.spawnCooldown.value <= 0) {
      const trainMesh = createTrainMesh();
      const startX =
        row.direction === 1
          ? -(HALF_BOARD + 8)
          : HALF_BOARD + 8;
      trainMesh.position.set(startX, 0, row.z);
      if (row.direction === -1) {
        trainMesh.rotation.y = Math.PI;
      }
      scene.add(trainMesh);

      newTrain = {
        mesh: trainMesh,
        speed: 12,
        direction: row.direction,
        halfW: 2.0,
        halfD: 0.3,
        x: startX,
        z: row.z,
        active: true,
      };
      newWarning = false;
      (row.warningLight.material as THREE.MeshLambertMaterial).color.setHex(
        0x444444
      );
    }
  }

  if (newTrain) {
    const newX = newTrain.x + newTrain.direction * newTrain.speed * dt;
    (newTrain as { x: number }).x = newX;
    newTrain.mesh.position.x = newX;

    if (Math.abs(newX) > HALF_BOARD + 12) {
      scene.remove(newTrain.mesh);
      newTrain.mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          }
        }
      });
      newTrain = null;
      row.warningTimer.value = randomFloat(5, 12);
    }
  }

  return {
    ...row,
    train: newTrain,
    warning: newWarning,
  };
}

export function getRailTrainAsCollidable(row: RailRow): Collidable[] {
  if (!row.train) return [];
  return [
    {
      x: row.train.x,
      z: row.train.z,
      halfW: row.train.halfW,
      halfD: row.train.halfD,
    },
  ];
}

export function isRailWarning(row: RailRow): boolean {
  return row.warning;
}

export function removeRailRow(row: RailRow, scene: THREE.Scene): void {
  scene.remove(row.group);
  row.group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      if (child.material instanceof THREE.Material) {
        child.material.dispose();
      }
    }
  });
  if (row.train) {
    scene.remove(row.train.mesh);
    row.train.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
    });
  }
}
