import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const fruit = new Mesh(geometries.fruit, materials.fruit);
  fruit.position.set(0, 0, 0);
  fruit.rotation.set(Math.PI / 4, Math.PI / 4, 0);

  return {
    fruit,
  };
}

export { createMeshes };
