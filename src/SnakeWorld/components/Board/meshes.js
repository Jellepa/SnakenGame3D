import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const tile = new Mesh(geometries.tile, materials.tile);

  return {
    tile,
  };
}

export { createMeshes };
