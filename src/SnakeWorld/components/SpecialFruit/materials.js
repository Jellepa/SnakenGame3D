import { MeshStandardMaterial } from "three";

function createMaterials() {
  const specialFruit = new MeshStandardMaterial({
    color: "MediumOrchid", // Purple color for special fruit
    flatShading: true,
  });

  return { specialFruit };
}

export { createMaterials };
