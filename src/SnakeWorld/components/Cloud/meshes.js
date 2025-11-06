import { Mesh } from "three";
import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const protoCloud = new Mesh(geometries.cloud, materials.cloud);

  return {
    protoCloud,
  };
}

export { createMeshes };
