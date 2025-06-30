import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const specialFruit = new Mesh(
    geometries.specialFruit,
    materials.specialFruit
  );

  return { specialFruit };
}

export { createMeshes };
