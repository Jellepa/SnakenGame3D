import { MeshStandardMaterial } from "three";

function createMaterials() {
  const wood = new MeshStandardMaterial({
    color: "BurlyWood",
    flatShading: true,
  });

  const metal = new MeshStandardMaterial({
    color: "DarkSlateGrey",
    flatShading: true,
  });

  return { wood, metal };
}

export { createMaterials };
