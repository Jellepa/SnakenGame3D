import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const protoSmoke = new Mesh(geometries.smoke, materials.smoke);

  return {
    protoSmoke,
  };
}

export { createMeshes };
