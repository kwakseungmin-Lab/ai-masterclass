import * as THREE from "three";
import { createLambertMaterial, randomInt, randomFloat, HALF_BOARD, GROUND_WIDTH } from "../utils.ts";
import { createTreeMesh } from "../vehicles.ts";

export interface GrassRow {
  readonly type: "grass";
  readonly z: number;
  readonly group: THREE.Group;
  readonly treePositions: readonly number[];
}

export function createGrassRow(z: number, scene: THREE.Scene): GrassRow {
  const group = new THREE.Group();

  const ground = new THREE.Mesh(
    new THREE.BoxGeometry(GROUND_WIDTH, 0.1, 1),
    createLambertMaterial(0x9acd32)
  );
  ground.position.set(0, -0.05, z);
  group.add(ground);

  const numTrees = randomInt(0, 4);
  const treePositions: number[] = [];
  const usedX = new Set<number>();

  for (let i = 0; i < numTrees; i++) {
    const tx = randomInt(-HALF_BOARD, HALF_BOARD);
    if (usedX.has(tx)) continue;
    usedX.add(tx);
    treePositions.push(tx);

    const tree = createTreeMesh();
    tree.position.set(tx, 0, z);
    tree.scale.setScalar(randomFloat(0.8, 1.2));
    group.add(tree);
  }

  scene.add(group);

  return {
    type: "grass",
    z,
    group,
    treePositions,
  };
}

export function removeGrassRow(row: GrassRow, scene: THREE.Scene): void {
  scene.remove(row.group);
  row.group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      if (child.material instanceof THREE.Material) {
        child.material.dispose();
      }
    }
  });
}
