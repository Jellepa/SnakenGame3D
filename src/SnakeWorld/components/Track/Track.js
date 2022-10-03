import { Group } from "three";

import { createMeshes } from "./meshes.js";

class Track extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();

    this.add(
      this.meshes.wood,
      this.meshes.wood2,
      this.meshes.wood3,
      this.meshes.wood4,
      this.meshes.wood5,
      this.meshes.wood6,
      this.meshes.wood7,
      this.meshes.wood8,
      this.meshes.wood9,
      this.meshes.wood10,
      this.meshes.metal,
      this.meshes.metal2
    );
  }
}

export { Track };
