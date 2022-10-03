import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

import { Window } from "./Window/Window.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const porch = new Mesh(geometries.wood, materials.wood);

  const main = new Mesh(geometries.wood, materials.wood);

  const by = new Mesh(geometries.wood, materials.wood);

  const mainRoof = new Mesh(geometries.roof, materials.roof);

  const byRoof = new Mesh(geometries.roof, materials.roof);

  porch.scale.set(9, 0.5, 4);

  porch.position.set(4.5, 0.25, 2);

  by.scale.set(3, 2, 4);

  by.position.set(7.5, 1.5, 2);

  main.scale.set(6, 2, 3);

  main.position.set(3, 1.5, 1.5);

  byRoof.scale.set(3, 4.2, 1);

  byRoof.rotation.x = -Math.PI / 2;

  byRoof.position.set(7.5, 2.8, 2);

  mainRoof.scale.set(3, 7.7, 1);

  mainRoof.rotation.x = -Math.PI / 2;

  mainRoof.rotation.z = -Math.PI / 2;

  mainRoof.position.set(3.55, 2.8, 1.5);

  const window = new Window();
  window.position.set(2, 1.5, 0);

  const window2 = window.clone();
  window2.position.set(4.5, 1.5, 0);

  const window3 = window.clone();
  window3.position.set(7, 1.5, 0);

  const window4 = window.clone();
  window4.rotation.y = Math.PI / 2;
  window4.position.set(0, 1.5, 1.5);

  const window5 = window.clone();
  window5.rotation.y = Math.PI;
  window5.position.set(2, 1.5, 3);

  const window6 = window.clone();
  window6.rotation.y = Math.PI;
  window6.position.set(4.5, 1.5, 3);

  return {
    porch,
    main,
    by,
    mainRoof,
    byRoof,
    window,
    window2,
    window3,
    window4,
    window5,
    window6,
  };
}

export { createMeshes };
