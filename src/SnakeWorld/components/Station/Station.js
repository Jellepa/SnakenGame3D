import { Group } from "three";

import { createMeshes } from "./meshes.js";
import { Window } from "./Window/Window.js";

class Station extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();

    this.add(
      this.meshes.porch,
      this.meshes.main,
      this.meshes.by,
      this.meshes.mainRoof,
      this.meshes.byRoof,
      this.meshes.window,
      this.meshes.window2,
      this.meshes.window3,
      this.meshes.window4,
      this.meshes.window5,
      this.meshes.window6
    );
  }
}

export { Station };
