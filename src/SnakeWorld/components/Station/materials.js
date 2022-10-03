import { MeshStandardMaterial } from "three";

function createMaterials() {
  const roof = new MeshStandardMaterial({
    color: "DarkOliveGreen",
    flatShading: true,
  });

  const wood = new MeshStandardMaterial({
    color: "BurlyWood",
    flatShading: true,
  });

  const window = new MeshStandardMaterial({
    /* transparent: true,
    opacity: 0.6, */
    color: "Cornsilk",
    flatShading: true,
  });

  const windowBar = new MeshStandardMaterial({
    color: "DarkSlateGrey",
    flatShading: true,
  });

  return { roof, wood, window, windowBar };
}

export { createMaterials };
