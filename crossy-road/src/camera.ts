import * as THREE from "three";

const CAMERA_LERP_SPEED = 4;
const IDLE_PUSH_SPEED = 0.3;
const FRUSTUM_SIZE = 6;
const PORTRAIT_RATIO = 9 / 16;

export interface CameraState {
  camera: THREE.OrthographicCamera;
  targetZ: number;
  cameraZ: number;
  idlePushZ: number;
}

function computeFrustum(): {
  left: number;
  right: number;
  top: number;
  bottom: number;
} {
  const windowAspect = window.innerWidth / window.innerHeight;
  const gameAspect = Math.min(windowAspect, PORTRAIT_RATIO);
  return {
    left: -FRUSTUM_SIZE * gameAspect,
    right: FRUSTUM_SIZE * gameAspect,
    top: FRUSTUM_SIZE,
    bottom: -FRUSTUM_SIZE,
  };
}

export function createCamera(): CameraState {
  const f = computeFrustum();
  const camera = new THREE.OrthographicCamera(
    f.left, f.right, f.top, f.bottom, 0.1, 1000
  );

  camera.position.set(8, 12, 8);
  camera.lookAt(0, 0, 0);

  return {
    camera,
    targetZ: 0,
    cameraZ: 0,
    idlePushZ: 0,
  };
}

export function updateCamera(
  state: CameraState,
  playerZ: number,
  dt: number
): CameraState {
  const newIdlePushZ = state.idlePushZ + IDLE_PUSH_SPEED * dt;
  const effectiveTargetZ = Math.min(playerZ, newIdlePushZ);
  const newTargetZ = effectiveTargetZ;
  const newCameraZ =
    state.cameraZ + (newTargetZ - state.cameraZ) * CAMERA_LERP_SPEED * dt;

  state.camera.position.set(8, 12, newCameraZ + 8);
  state.camera.lookAt(0, 0, newCameraZ);

  return {
    ...state,
    targetZ: newTargetZ,
    cameraZ: newCameraZ,
    idlePushZ: newIdlePushZ,
  };
}

export function resizeCamera(state: CameraState): void {
  const f = computeFrustum();
  state.camera.left = f.left;
  state.camera.right = f.right;
  state.camera.top = f.top;
  state.camera.bottom = f.bottom;
  state.camera.updateProjectionMatrix();
}

export function resetCamera(state: CameraState): CameraState {
  return {
    ...state,
    targetZ: 0,
    cameraZ: 0,
    idlePushZ: 0,
  };
}

export function getCameraMinZ(state: CameraState): number {
  return state.cameraZ + 6;
}
