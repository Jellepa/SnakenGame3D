import { MeshStandardMaterial } from "three";

function createMaterials() {
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

  return { window, windowBar };
}

export { createMaterials };
