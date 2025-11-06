import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

import { Window } from "./Window/Window.js";
import { Smoke } from "./Smoke/Smoke.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const cabin = new Mesh(geometries.cabin, materials.body);
  cabin.position.set(1.5, 1.4, 0);

  const chimney = new Mesh(geometries.chimney, materials.detail);
  chimney.position.set(-2, 1.9, 0);

  const nose = new Mesh(geometries.nose, materials.body);
  nose.position.set(-1, 1, 0);
  nose.rotation.z = Math.PI / 2;

  const smallWheelRear = new Mesh(geometries.wheel, materials.detail);
  smallWheelRear.position.y = 0.5;
  smallWheelRear.rotation.x = Math.PI / 2;

  const smallWheelCenter = smallWheelRear.clone();
  smallWheelCenter.position.x = -1;

  const smallWheelFront = smallWheelRear.clone();
  smallWheelFront.position.x = -2;

  const bigWheel = smallWheelRear.clone();
  bigWheel.position.set(1.5, 0.9, 0);
  bigWheel.scale.set(2, 1.25, 2);

  const window = new Window();
  window.scale.set(1, 0.4, 1);
  window.position.set(1.5, 2, -0.8);

  const window2 = window.clone();
  window2.rotation.y = Math.PI;
  window2.position.set(1.5, 2, 0.8);

  const window3 = window.clone();
  window3.rotation.y = -Math.PI / 2;
  window3.position.set(2.5, 2, 0);

  const window4 = window.clone();
  window4.rotation.y = Math.PI / 2;
  window4.position.set(0.5, 2, 0);

  const smoke = new Smoke();
  smoke.position.set(-1.7, 1.5, 0);
  smoke.scale.set(0.5, 0.5, 0.5);

  return {
    nose,
    cabin,
    chimney,
    smallWheelRear,
    smallWheelCenter,
    smallWheelFront,
    bigWheel,
    window,
    window2,
    window3,
    window4,
    smoke,
  };
}

export { createMeshes };
