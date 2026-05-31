import * as THREE from "three";
import {
  type CameraState,
  createCamera,
  updateCamera,
  resizeCamera,
  resetCamera,
  getCameraMinZ,
} from "./camera.ts";
import {
  type PlayerState,
  createPlayer,
  startHop,
  updatePlayer,
  getPlayerScore,
  resetPlayer,
  setPlayerPosition,
  type Direction,
} from "./player.ts";
import {
  type TerrainState,
  createTerrain,
  updateTerrain,
  getRowAtZ,
  getVehicleCollidablesAtZ,
  getLogCollidablesAtZ,
  getLogSpeedAtZ,
  isTreeAt,
  resetTerrain,
} from "./terrain/row-generator.ts";
import { checkCollision, isOnPlatform } from "./collision.ts";
import {
  type UIState,
  createUI,
  updateScore,
  setScreen,
} from "./ui.ts";
import { HALF_BOARD } from "./utils.ts";

export interface GameState {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  cameraState: CameraState;
  player: PlayerState;
  terrain: TerrainState;
  ui: UIState;
  running: boolean;
  lastTime: number;
  dead: boolean;
}

function setupLighting(scene: THREE.Scene): void {
  const ambient = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 1.0);
  directional.position.set(5, 15, 5);
  directional.castShadow = true;
  directional.shadow.mapSize.set(1024, 1024);
  directional.shadow.camera.near = 0.5;
  directional.shadow.camera.far = 50;
  directional.shadow.camera.left = -15;
  directional.shadow.camera.right = 15;
  directional.shadow.camera.top = 15;
  directional.shadow.camera.bottom = -15;
  scene.add(directional);

  const hemi = new THREE.HemisphereLight(0xaaddff, 0x88cc55, 0.5);
  scene.add(hemi);
}

export function createGame(): GameState {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaad4e6);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const gameHeight = window.innerHeight;
  const gameWidth = Math.min(window.innerWidth, Math.floor(gameHeight * 9 / 16));
  renderer.setSize(gameWidth, gameHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  setupLighting(scene);

  const cameraState = createCamera();
  const player = createPlayer(scene);
  const terrain = createTerrain(scene);
  const ui = createUI();

  return {
    scene,
    renderer,
    cameraState,
    player,
    terrain,
    ui,
    running: false,
    lastTime: 0,
    dead: false,
  };
}

function tryMove(
  state: GameState,
  dir: Direction
): GameState {
  if (state.player.isHopping || state.dead) return state;

  let targetX = state.player.x;
  let targetZ = state.player.z;

  switch (dir) {
    case "forward":
      targetZ -= 1;
      break;
    case "backward":
      targetZ += 1;
      break;
    case "left":
      targetX -= 1;
      break;
    case "right":
      targetX += 1;
      break;
  }

  targetX = Math.round(Math.max(-HALF_BOARD, Math.min(HALF_BOARD, targetX)));
  targetZ = Math.round(targetZ);

  if (isTreeAt(state.terrain, targetX, targetZ)) {
    return state;
  }

  return {
    ...state,
    player: startHop(state.player, dir),
  };
}

function checkDeath(state: GameState): boolean {
  const { player, terrain, cameraState } = state;

  if (player.isHopping) return false;

  const px = player.x;
  const pz = player.z;

  const playerCollidable = { x: px, z: pz, halfW: 0.25, halfD: 0.25 };

  const vehiclesCurrentRow = getVehicleCollidablesAtZ(terrain, pz);
  for (const v of vehiclesCurrentRow) {
    if (checkCollision(playerCollidable, v)) {
      return true;
    }
  }

  const row = getRowAtZ(terrain, pz);
  if (row && row.type === "river") {
    const logs = getLogCollidablesAtZ(terrain, pz);
    if (!isOnPlatform(px, pz, logs)) {
      return true;
    }
  }

  const cameraMinZ = getCameraMinZ(cameraState);
  if (pz > cameraMinZ) {
    return true;
  }

  if (Math.abs(px) > HALF_BOARD + 1) {
    return true;
  }

  return false;
}

function handleLogCarry(state: GameState, dt: number): GameState {
  const { player, terrain } = state;
  if (player.isHopping) return state;

  const row = getRowAtZ(terrain, player.z);
  if (!row || row.type !== "river") return state;

  const logSpeed = getLogSpeedAtZ(terrain, player.z);
  if (logSpeed === 0) return state;

  const newX = player.x + logSpeed * dt;
  return {
    ...state,
    player: setPlayerPosition(player, newX, player.z),
  };
}

export function updateGame(state: GameState, dt: number): GameState {
  if (!state.running || state.dead) return state;

  let newState = { ...state };

  newState.player = updatePlayer(newState.player, dt);

  newState = handleLogCarry(newState, dt);

  newState.terrain = updateTerrain(
    newState.terrain,
    newState.player.z,
    dt,
    newState.scene
  );

  newState.cameraState = updateCamera(
    newState.cameraState,
    newState.player.z,
    dt
  );

  const score = getPlayerScore(newState.player);
  newState.ui = updateScore(newState.ui, score);

  if (checkDeath(newState)) {
    newState.dead = true;
    newState.running = false;
    newState.ui = setScreen(newState.ui, "gameover");
  }

  return newState;
}

export function startGame(state: GameState): GameState {
  const player = resetPlayer(state.player);
  const terrain = resetTerrain(state.terrain, state.scene);
  const cameraState = resetCamera(state.cameraState);
  const ui = setScreen({ ...state.ui, score: 0 }, "playing");

  return {
    ...state,
    player,
    terrain,
    cameraState,
    ui,
    running: true,
    dead: false,
  };
}

export function handleInput(state: GameState, key: string): GameState {
  if (state.ui.screen === "menu") {
    if (key === " " || key === "Enter") {
      return startGame(state);
    }
    return state;
  }

  if (state.ui.screen === "gameover") {
    if (key === " " || key === "Enter") {
      return startGame(state);
    }
    return state;
  }

  if (!state.running || state.dead) return state;

  switch (key) {
    case "ArrowUp":
    case "w":
    case "W":
      return tryMove(state, "forward");
    case "ArrowDown":
    case "s":
    case "S":
      return tryMove(state, "backward");
    case "ArrowLeft":
    case "a":
    case "A":
      return tryMove(state, "left");
    case "ArrowRight":
    case "d":
    case "D":
      return tryMove(state, "right");
    default:
      return state;
  }
}

export function handleResize(state: GameState): void {
  const gameHeight = window.innerHeight;
  const gameWidth = Math.min(window.innerWidth, Math.floor(gameHeight * 9 / 16));
  state.renderer.setSize(gameWidth, gameHeight);
  resizeCamera(state.cameraState);
}

export function render(state: GameState): void {
  state.renderer.render(state.scene, state.cameraState.camera);
}
