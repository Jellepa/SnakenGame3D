import { MeshStandardMaterial } from "three";

function createMaterials() {
  const wood = new MeshStandardMaterial({
    color: "BurlyWood",
    flatShading: true,
  });

  const leaf = new MeshStandardMaterial({
    color: "DarkGreen",
    flatShading: true,
  });

  return { wood, leaf };
}

export { createMaterials };
