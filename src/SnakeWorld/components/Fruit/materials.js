import { MeshStandardMaterial } from "three";

function createMaterials() {
  const fruit = new MeshStandardMaterial({
    color: "Gold",
    flatShading: true,
  });

  return { fruit };
}

export { createMaterials };
