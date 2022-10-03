import { Group } from "three";

import { createMeshes } from "./meshes.js";

class Pine extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();

    this.add(
      this.meshes.wood,
      this.meshes.leaf,
      this.meshes.leaf2,
      this.meshes.leaf3
    );
  }
}

export { Pine };
