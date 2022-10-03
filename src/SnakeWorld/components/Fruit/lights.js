import { RectAreaLight, SpotLight } from "three";

function createLights() {
  const rectLight = new RectAreaLight({
    color: "Gold",
    intensity: 0.1,
    width: 0.1,
    height: 0.1,
  });
  rectLight.position.set(0, 3, 0);
  rectLight.lookAt(0, -0.1, 0);

  const spotLight = new SpotLight("Gold", 9);
  spotLight.position.set(0, 5, 0);

  return { rectLight, spotLight };
}

export { createLights };
