import { DirectionalLight, HemisphereLight } from "three";

function createDirectionalLight() {
  // Create a directional light

  const light = new DirectionalLight(0xffffff, 1);

  // move the light right, up, and towards us
  light.position.set(-1, 25, -2);
  light.target.position.set(7.5, 0, 7.5);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.left = -12;
  light.shadow.camera.bottom = -12;
  light.shadow.camera.right = 12;
  light.shadow.camera.top = 12;
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 500; // default

  return light;
}

function createHemisphereLight() {
  const skycolor = 0x54f7ef;
  const groundcolor = 0x49332c;
  const intensity = 2.4;
  const position = [0, 1.5, 0];

  const hemisphereLight = new HemisphereLight(skycolor, groundcolor, intensity);

  return hemisphereLight;
}

export { createDirectionalLight, createHemisphereLight };
