import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const head = new Mesh(geometries.head, materials.head);
  head.rotation.z = Math.PI / 2;
  head.position.set(0, 0.7, 0);

  const eye = new Mesh(geometries.eye, materials.eye);
  eye.position.set(0.5, 0.9, -0.2);

  const eye2 = eye.clone();
  eye2.position.set(0.5, 0.9, 0.2);

  return {
    head,
    eye,
    eye2,
  };
}

export { createMeshes };
