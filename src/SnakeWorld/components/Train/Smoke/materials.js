import { MeshStandardMaterial } from "three";

function createMaterials() {
  const smoke = new MeshStandardMaterial({
    color: "#ffffff",
    //flatShading: true,
  });

  return { smoke };
}

export { createMaterials };
