import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

function createHelpers() {
  const rectLightHelper = new RectAreaLightHelper();

  return { rectLightHelper };
}

export { createHelpers };
