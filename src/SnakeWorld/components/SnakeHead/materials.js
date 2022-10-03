import { MeshStandardMaterial } from "three";

function createMaterials() {
  const head = new MeshStandardMaterial({
    color: "DeepSkyBlue",
    flatShading: true,
  });

  const eye = new MeshStandardMaterial({
    color: "DeepSkyBlue",
    flatShading: true,
  });

  return { head, eye };
}

export { createMaterials };
