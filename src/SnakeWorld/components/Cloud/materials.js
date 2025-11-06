import { MeshStandardMaterial } from "three";

function createMaterials() {
  const cloud = new MeshStandardMaterial({
    color: "White",
    flatShading: true,
  });

  return { cloud };
}

export { createMaterials };
