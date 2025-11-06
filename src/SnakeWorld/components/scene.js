import { Color, Scene } from "three";

function createScene() {
  const scene = new Scene();

  scene.background = new Color("#87CEEB"); // Sky blue background

  return scene;
}

export { createScene };
