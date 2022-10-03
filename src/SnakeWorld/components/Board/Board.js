import { Group } from "three";

import { createMeshes } from "./meshes.js";

class Board extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();

    this.protoTile = this.meshes.tile;
    this.protoTile.castShadow = true;
    this.protoTile.receiveShadow = true;

    this.protoTile.position.set(0, -0.5, 0);

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const tile = this.protoTile.clone();
        tile.position.x = x * 1.5;
        tile.position.z = y * 1.5;
        this.add(tile);
      }
    }
  }
}

export { Board };
