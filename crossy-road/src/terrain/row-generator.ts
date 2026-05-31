import * as THREE from "three";
import { randomChoice } from "../utils.ts";
import {
  type GrassRow,
  createGrassRow,
  removeGrassRow,
} from "./grass-row.ts";
import {
  type RoadRow,
  createRoadRow,
  updateRoadRow,
  removeRoadRow,
  getRoadVehiclesAsCollidables,
} from "./road-row.ts";
import {
  type RiverRow,
  createRiverRow,
  updateRiverRow,
  removeRiverRow,
  getRiverLogsAsCollidables,
  getRiverLogSpeed,
} from "./river-row.ts";
import {
  type RailRow,
  createRailRow,
  updateRailRow,
  removeRailRow,
  getRailTrainAsCollidable,
} from "./rail-row.ts";
import type { Collidable } from "../collision.ts";

export type RowType = "grass" | "road" | "river" | "rail";
export type Row = GrassRow | RoadRow | RiverRow | RailRow;

interface RowCounts {
  grass: number;
  road: number;
  river: number;
  rail: number;
}

const MAX_CONSECUTIVE: RowCounts = {
  grass: 3,
  road: 4,
  river: 3,
  rail: 1,
};

export interface TerrainState {
  readonly rows: Row[];
  readonly lastRowZ: number;
  readonly consecutiveType: RowType;
  readonly consecutiveCount: number;
}

function nextRowType(
  currentType: RowType,
  consecutiveCount: number
): RowType {
  const types: RowType[] = ["grass", "road", "river", "rail"];
  const weights: RowType[] = [];

  for (const t of types) {
    if (t === currentType && consecutiveCount >= MAX_CONSECUTIVE[t]) {
      continue;
    }
    const count =
      t === "grass"
        ? 3
        : t === "road"
          ? 4
          : t === "river"
            ? 2
            : 1;
    for (let i = 0; i < count; i++) {
      weights.push(t);
    }
  }

  return randomChoice(weights);
}

function createRow(type: RowType, z: number, scene: THREE.Scene): Row {
  switch (type) {
    case "grass":
      return createGrassRow(z, scene);
    case "road":
      return createRoadRow(z, scene);
    case "river":
      return createRiverRow(z, scene);
    case "rail":
      return createRailRow(z, scene);
  }
}

function removeRow(row: Row, scene: THREE.Scene): void {
  switch (row.type) {
    case "grass":
      removeGrassRow(row, scene);
      break;
    case "road":
      removeRoadRow(row, scene);
      break;
    case "river":
      removeRiverRow(row, scene);
      break;
    case "rail":
      removeRailRow(row, scene);
      break;
  }
}

export function createTerrain(scene: THREE.Scene): TerrainState {
  const rows: Row[] = [];

  for (let z = 3; z >= -2; z--) {
    rows.push(createGrassRow(z, scene));
  }

  let lastZ = -2;
  let consType: RowType = "grass";
  let consCount = 5;

  for (let i = 0; i < 20; i++) {
    lastZ -= 1;
    const type = nextRowType(consType, consCount);
    rows.push(createRow(type, lastZ, scene));
    if (type === consType) {
      consCount++;
    } else {
      consType = type;
      consCount = 1;
    }
  }

  return {
    rows,
    lastRowZ: lastZ,
    consecutiveType: consType,
    consecutiveCount: consCount,
  };
}

export function updateTerrain(
  state: TerrainState,
  playerZ: number,
  dt: number,
  scene: THREE.Scene
): TerrainState {
  let { rows, lastRowZ, consecutiveType, consecutiveCount } = state;

  const updatedRows: Row[] = [];
  for (const row of rows) {
    if (row.type === "road") {
      updateRoadRow(row, dt, scene);
      updatedRows.push(row);
    } else if (row.type === "river") {
      updateRiverRow(row, dt, scene);
      updatedRows.push(row);
    } else if (row.type === "rail") {
      const updated = updateRailRow(row, dt, scene);
      updatedRows.push(updated);
    } else {
      updatedRows.push(row);
    }
  }

  while (lastRowZ > playerZ - 25) {
    lastRowZ -= 1;
    const type = nextRowType(consecutiveType, consecutiveCount);
    updatedRows.push(createRow(type, lastRowZ, scene));
    if (type === consecutiveType) {
      consecutiveCount++;
    } else {
      consecutiveType = type;
      consecutiveCount = 1;
    }
  }

  const removeIndices: number[] = [];
  for (let i = 0; i < updatedRows.length; i++) {
    if (updatedRows[i].z > playerZ + 12) {
      removeIndices.push(i);
    }
  }
  for (let i = removeIndices.length - 1; i >= 0; i--) {
    const idx = removeIndices[i];
    removeRow(updatedRows[idx], scene);
    updatedRows.splice(idx, 1);
  }

  return {
    rows: updatedRows,
    lastRowZ,
    consecutiveType,
    consecutiveCount,
  };
}

export function getRowAtZ(state: TerrainState, z: number): Row | undefined {
  return state.rows.find((r) => Math.abs(r.z - z) < 0.5);
}

export function getVehicleCollidablesAtZ(
  state: TerrainState,
  z: number
): Collidable[] {
  const row = getRowAtZ(state, z);
  if (!row) return [];
  if (row.type === "road") return getRoadVehiclesAsCollidables(row);
  if (row.type === "rail") return getRailTrainAsCollidable(row);
  return [];
}

export function getLogCollidablesAtZ(
  state: TerrainState,
  z: number
): Collidable[] {
  const row = getRowAtZ(state, z);
  if (!row || row.type !== "river") return [];
  return getRiverLogsAsCollidables(row);
}

export function getLogSpeedAtZ(
  state: TerrainState,
  z: number
): number {
  const row = getRowAtZ(state, z);
  if (!row || row.type !== "river") return 0;
  return getRiverLogSpeed(row);
}

export function isTreeAt(
  state: TerrainState,
  x: number,
  z: number
): boolean {
  const row = getRowAtZ(state, z);
  if (!row || row.type !== "grass") return false;
  const rx = Math.round(x);
  return row.treePositions.some((tx) => tx === rx);
}

export function resetTerrain(
  state: TerrainState,
  scene: THREE.Scene
): TerrainState {
  for (const row of state.rows) {
    removeRow(row, scene);
  }
  return createTerrain(scene);
}
