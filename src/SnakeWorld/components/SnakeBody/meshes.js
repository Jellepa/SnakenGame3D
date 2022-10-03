import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const body = new Mesh(geometries.body, materials.body);

  body.rotation.z = Math.PI / 2;

  body.position.set(0, 0.7, 0);
  return {
    body,
  };
}

export { createMeshes };
