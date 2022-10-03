import { Group } from "three";

import { createMeshes } from "./meshes.js";

class Ground extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();

    this.meshes.ground.receiveShadow = true;

    this.add(this.meshes.ground);
  }
}

export { Ground };
