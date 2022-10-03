import { Group } from "three";

import { createMeshes } from "./meshes.js";

class SnakeHead extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();

    this.meshes.eye.castShadow = true;
    this.meshes.eye.receiveShadow = true;
    this.meshes.eye2.castShadow = true;
    this.meshes.eye2.receiveShadow = true;
    this.meshes.head.castShadow = true;
    this.meshes.head.receiveShadow = true;

    this.add(this.meshes.eye);
    this.add(this.meshes.eye2);
    this.add(this.meshes.head);
  }

  tick(delta, elapsedTime, stepTime, stepPosition) {
    if (this.newPosition) {
      let positionX =
        this.oldPosition.x +
        ((this.newPosition.x - this.oldPosition.x) / stepTime) * stepPosition;

      let positionZ =
        this.oldPosition.z +
        ((this.newPosition.z - this.oldPosition.z) / stepTime) * stepPosition;

      this.position.set(positionX, 0.7, positionZ);
    }

    if (this.newRotation) {
      let RotationY =
        this.oldRotation.y +
        ((this.newRotation.y - this.oldRotation.y) / stepTime) * stepPosition;

      this.rotation.set(0, RotationY, 0);
    }
  }
}

export { SnakeHead };
