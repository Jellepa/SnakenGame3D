import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const wood = new Mesh(geometries.wood, materials.wood);
  wood.position.set(0, 0.5, 0);

  const leaf = new Mesh(geometries.leaf, materials.leaf);
  leaf.position.set(0, 2, 0);
  leaf.scale.set(1.2, 1.2, 1.2);

  const leaf2 = new Mesh(geometries.leaf, materials.leaf);
  leaf2.position.set(0, 3, 0);

  const leaf3 = new Mesh(geometries.leaf, materials.leaf);
  leaf3.position.set(0, 4, 0);
  leaf3.scale.set(0.8, 0.8, 0.8);

  return {
    wood,
    leaf,
    leaf2,
    leaf3,
  };
}

export { createMeshes };
