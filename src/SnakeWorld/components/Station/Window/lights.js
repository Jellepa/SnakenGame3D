import { RectAreaLight } from "three";

function createLights() {
  const width = 1;
  const height = 1;
  const intensity = 10;
  const rectLight = new RectAreaLight(0xffffff, intensity, width, height);
  rectLight.position.set(0, 0, -0.04);

  return { rectLight };
}

export { createLights };
