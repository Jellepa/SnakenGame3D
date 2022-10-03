import { MeshStandardMaterial } from "three";

function createMaterials() {
  const ground = new MeshStandardMaterial({
    // color: "#222",
    color: "#222",
    flatShading: false,
  });

  return { ground };
}

export { createMaterials };
