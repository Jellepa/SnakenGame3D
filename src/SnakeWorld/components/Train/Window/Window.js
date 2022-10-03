import { Group, MathUtils } from "three";
//import { createHelpers } from "./helper.js";
// import { createLights } from "./lights.js";

import { createMeshes } from "./meshes.js";

const wheelSpeed = MathUtils.degToRad(24);

class Window extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();

    // this.lights = createLights();

    // this.helpers = createHelpers();

    this.add(
      this.meshes.window,
      this.meshes.windowBarStandingLeft,
      this.meshes.windowBarStandingRight,
      this.meshes.windowBarFlatBottom,
      this.meshes.windowBarFlatTop
      // this.lights.rectLight
    );
  }
  tick(delta) {
    this.meshes.window.rotation.y += wheelSpeed * delta;
  }
}

export { Window };
