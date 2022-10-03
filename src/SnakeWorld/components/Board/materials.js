import { MeshStandardMaterial } from "three";

function createMaterials() {
  const tile = new MeshStandardMaterial({
    color: "#bbbbbb",
    flatShading: true,
  });

  return { tile };
}

export { createMaterials };
