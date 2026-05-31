import * as THREE from "three";
import { createLambertMaterial, randomColor } from "./utils.ts";

export function createCarMesh(): THREE.Group {
  const group = new THREE.Group();
  const color = randomColor();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.35, 0.45),
    createLambertMaterial(color)
  );
  body.position.y = 0.2;
  group.add(body);

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.25, 0.4),
    createLambertMaterial(color)
  );
  roof.position.set(0.0, 0.45, 0);
  group.add(roof);

  const wheelMat = createLambertMaterial(0x222222);
  const wheelGeo = new THREE.BoxGeometry(0.12, 0.12, 0.5);
  const positions: [number, number, number][] = [
    [-0.2, 0.06, 0],
    [0.2, 0.06, 0],
  ];
  for (const pos of positions) {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.position.set(...pos);
    group.add(wheel);
  }

  return group;
}

export function createTruckMesh(): THREE.Group {
  const group = new THREE.Group();
  const color = randomColor();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.5, 0.5),
    createLambertMaterial(color)
  );
  body.position.y = 0.3;
  group.add(body);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.35, 0.45),
    createLambertMaterial(0xdddddd)
  );
  cabin.position.set(0.55, 0.55, 0);
  group.add(cabin);

  const wheelMat = createLambertMaterial(0x222222);
  const wheelGeo = new THREE.BoxGeometry(0.12, 0.12, 0.55);
  const positions: [number, number, number][] = [
    [-0.45, 0.06, 0],
    [0.0, 0.06, 0],
    [0.45, 0.06, 0],
  ];
  for (const pos of positions) {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.position.set(...pos);
    group.add(wheel);
  }

  return group;
}

export function createBusMesh(): THREE.Group {
  const group = new THREE.Group();
  const color = randomColor();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.55, 0.5),
    createLambertMaterial(color)
  );
  body.position.y = 0.35;
  group.add(body);

  const windowMat = createLambertMaterial(0x87ceeb);
  const windowGeo = new THREE.BoxGeometry(0.15, 0.2, 0.52);
  for (let i = -0.7; i <= 0.7; i += 0.35) {
    const win = new THREE.Mesh(windowGeo, windowMat);
    win.position.set(i, 0.45, 0);
    group.add(win);
  }

  const wheelMat = createLambertMaterial(0x222222);
  const wheelGeo = new THREE.BoxGeometry(0.12, 0.12, 0.55);
  const positions: [number, number, number][] = [
    [-0.7, 0.06, 0],
    [0.0, 0.06, 0],
    [0.7, 0.06, 0],
  ];
  for (const pos of positions) {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.position.set(...pos);
    group.add(wheel);
  }

  return group;
}

export function createLogMesh(length: number): THREE.Group {
  const group = new THREE.Group();
  const geo = new THREE.CylinderGeometry(0.2, 0.2, length * 0.9, 6);
  geo.rotateZ(Math.PI / 2);
  const mesh = new THREE.Mesh(geo, createLambertMaterial(0x8b4513));
  mesh.position.y = 0.15;
  group.add(mesh);

  const ringGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.05, 6);
  ringGeo.rotateZ(Math.PI / 2);
  const ringMat = createLambertMaterial(0x654321);
  for (const offset of [-length * 0.35, 0, length * 0.35]) {
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(offset, 0.15, 0);
    group.add(ring);
  }

  return group;
}

export function createTrainMesh(): THREE.Group {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(4.0, 0.7, 0.6),
    createLambertMaterial(0xcc3333)
  );
  body.position.y = 0.4;
  group.add(body);

  const top = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.2, 0.55),
    createLambertMaterial(0xaa2222)
  );
  top.position.y = 0.8;
  group.add(top);

  const frontLight = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.15, 0.62),
    createLambertMaterial(0xffff00)
  );
  frontLight.position.set(1.9, 0.4, 0);
  group.add(frontLight);

  const wheelMat = createLambertMaterial(0x333333);
  const wheelGeo = new THREE.BoxGeometry(0.15, 0.15, 0.65);
  for (let i = -1.5; i <= 1.5; i += 0.75) {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.position.set(i, 0.08, 0);
    group.add(wheel);
  }

  return group;
}

export function createTreeMesh(): THREE.Group {
  const group = new THREE.Group();

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.4, 6),
    createLambertMaterial(0x8b4513)
  );
  trunk.position.y = 0.2;
  group.add(trunk);

  const leaves = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    createLambertMaterial(0x228b22)
  );
  leaves.position.y = 0.65;
  group.add(leaves);

  return group;
}

export function createChickenMesh(): THREE.Group {
  const group = new THREE.Group();

  const bodyMat = createLambertMaterial(0xffffff);
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.35), bodyMat);
  body.position.y = 0.35;
  group.add(body);

  const headMat = createLambertMaterial(0xffffff);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), headMat);
  head.position.set(0.0, 0.6, -0.1);
  group.add(head);

  const combMat = createLambertMaterial(0xff0000);
  const comb = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.08), combMat);
  comb.position.set(0.0, 0.78, -0.1);
  group.add(comb);

  const beakMat = createLambertMaterial(0xff8c00);
  const beak = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.1), beakMat);
  beak.position.set(0.0, 0.55, -0.25);
  group.add(beak);

  const legMat = createLambertMaterial(0xff8c00);
  const legGeo = new THREE.BoxGeometry(0.05, 0.15, 0.05);
  const leftLeg = new THREE.Mesh(legGeo, legMat);
  leftLeg.position.set(-0.08, 0.08, 0);
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, legMat);
  rightLeg.position.set(0.08, 0.08, 0);
  group.add(rightLeg);

  return group;
}
