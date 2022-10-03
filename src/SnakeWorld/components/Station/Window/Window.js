import { Group } from "three";
//import { createHelpers } from "./helper.js";
//import { createLights } from "./lights.js";

import { createMeshes } from "./meshes.js";

class Window extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();

    //this.lights = createLights();

    // this.helpers = createHelpers();

    this.add(
      this.meshes.window,
      this.meshes.windowBarStandingCenter,
      this.meshes.windowBarStandingLeft,
      this.meshes.windowBarStandingRight,
      this.meshes.windowBarFlatBottom,
      this.meshes.windowBarFlatCenter,
      this.meshes.windowBarFlatTop
      //this.lights.rectLight
    );
  }
}

export { Window };
