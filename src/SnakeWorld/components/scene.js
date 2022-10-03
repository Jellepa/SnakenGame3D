import { Color, Scene } from "three";

function createScene() {
  const scene = new Scene();

  scene.background = new Color("teal");

  return scene;
}

export { createScene };
