import * as THREE from "three";
import {
  createLambertMaterial,
  randomFloat,
  randomChoice,
  HALF_BOARD,
  GROUND_WIDTH,
} from "../utils.ts";
import { createCarMesh, createTruckMesh, createBusMesh } from "../vehicles.ts";
import type { Collidable } from "../collision.ts";

type VehicleType = "car" | "truck" | "bus";

interface Vehicle {
  readonly mesh: THREE.Group;
  readonly speed: number;
  readonly direction: 1 | -1;
  readonly halfW: number;
  readonly halfD: number;
  x: number;
  readonly z: number;
}

export interface RoadRow {
  readonly type: "road";
  readonly z: number;
  readonly group: THREE.Group;
  readonly vehicles: Vehicle[];
  readonly spawnTimer: { value: number };
  readonly spawnInterval: number;
  readonly direction: 1 | -1;
  readonly speed: number;
  readonly vehicleType: VehicleType;
}

function vehicleDims(vtype: VehicleType): { halfW: number; halfD: number } {
  switch (vtype) {
    case "car":
      return { halfW: 0.35, halfD: 0.22 };
    case "truck":
      return { halfW: 0.7, halfD: 0.25 };
    case "bus":
      return { halfW: 1.1, halfD: 0.25 };
  }
}

function createVehicleMesh(vtype: VehicleType): THREE.Group {
  switch (vtype) {
    case "car":
      return createCarMesh();
    case "truck":
      return createTruckMesh();
    case "bus":
      return createBusMesh();
  }
}

function spawnVehicle(row: RoadRow, scene: THREE.Scene): void {
  const mesh = createVehicleMesh(row.vehicleType);
  const startX =
    row.direction === 1
      ? -(HALF_BOARD + 3)
      : HALF_BOARD + 3;

  mesh.position.set(startX, 0, row.z);
  mesh.scale.x = row.direction;
  scene.add(mesh);

  const dims = vehicleDims(row.vehicleType);
  row.vehicles.push({
    mesh,
    speed: row.speed,
    direction: row.direction,
    halfW: dims.halfW,
    halfD: dims.halfD,
    x: startX,
    z: row.z,
  });
}

export function createRoadRow(z: number, scene: THREE.Scene): RoadRow {
  const group = new THREE.Group();

  const ground = new THREE.Mesh(
    new THREE.BoxGeometry(GROUND_WIDTH, 0.1, 1),
    createLambertMaterial(0x6a6a6a)
  );
  ground.position.set(0, -0.05, z);
  group.add(ground);

  for (let lx = -GROUND_WIDTH / 2; lx <= GROUND_WIDTH / 2; lx += 2) {
    const dashLen = 0.3;
    const dash = new THREE.Mesh(
      new THREE.BoxGeometry(dashLen, 0.02, 0.05),
      createLambertMaterial(0xffffff)
    );
    dash.position.set(lx, 0.01, z);
    group.add(dash);
  }

  scene.add(group);

  const direction: 1 | -1 = randomChoice([1, -1]);
  const speed = randomFloat(2, 5);
  const vehicleType: VehicleType = randomChoice(["car", "truck", "bus"]);

  const row: RoadRow = {
    type: "road",
    z,
    group,
    vehicles: [],
    spawnTimer: { value: 0 },
    spawnInterval: randomFloat(1.5, 3.5),
    direction,
    speed,
    vehicleType,
  };

  const numInitial = 2;
  for (let i = 0; i < numInitial; i++) {
    const mesh = createVehicleMesh(vehicleType);
    const dims = vehicleDims(vehicleType);
    const spacing = (HALF_BOARD * 2) / (numInitial + 1);
    const xPos =
      -HALF_BOARD + spacing * (i + 1) + randomFloat(-0.5, 0.5);

    mesh.position.set(xPos, 0, z);
    mesh.scale.x = direction;
    scene.add(mesh);

    row.vehicles.push({
      mesh,
      speed,
      direction,
      halfW: dims.halfW,
      halfD: dims.halfD,
      x: xPos,
      z,
    });
  }

  return row;
}

export function updateRoadRow(
  row: RoadRow,
  dt: number,
  scene: THREE.Scene
): void {
  row.spawnTimer.value += dt;
  if (row.spawnTimer.value >= row.spawnInterval) {
    row.spawnTimer.value = 0;
    spawnVehicle(row, scene);
  }

  const removeIndices: number[] = [];
  for (let i = 0; i < row.vehicles.length; i++) {
    const v = row.vehicles[i];
    const newX = v.x + v.direction * v.speed * dt;
    (v as { x: number }).x = newX;
    v.mesh.position.x = newX;

    if (Math.abs(newX) > HALF_BOARD + 5) {
      removeIndices.push(i);
    }
  }

  for (let i = removeIndices.length - 1; i >= 0; i--) {
    const idx = removeIndices[i];
    const v = row.vehicles[idx];
    scene.remove(v.mesh);
    v.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
    });
    row.vehicles.splice(idx, 1);
  }
}

export function getRoadVehiclesAsCollidables(row: RoadRow): Collidable[] {
  return row.vehicles.map((v) => ({
    x: v.x,
    z: v.z,
    halfW: v.halfW,
    halfD: v.halfD,
  }));
}

export function removeRoadRow(row: RoadRow, scene: THREE.Scene): void {
  scene.remove(row.group);
  row.group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      if (child.material instanceof THREE.Material) {
        child.material.dispose();
      }
    }
  });
  for (const v of row.vehicles) {
    scene.remove(v.mesh);
    v.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
    });
  }
}
