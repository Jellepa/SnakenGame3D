import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const ground = new Mesh(geometries.plane, materials.ground);
  ground.rotation.set(-Math.PI / 2, 0, 0);
  ground.position.set(0, -0.9, 0);

  return {
    ground,
  };
}

export { createMeshes };
