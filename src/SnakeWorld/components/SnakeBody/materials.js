import { MeshStandardMaterial } from "three";

function createMaterials() {
  const body = new MeshStandardMaterial({
    color: "DeepSkyBlue",
    flatShading: true,
  });

  return { body };
}

export { createMaterials };
