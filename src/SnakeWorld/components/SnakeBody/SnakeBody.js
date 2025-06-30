import { Group } from "three";

import { createMeshes } from "./meshes.js";
import { lerpAngle } from "../../systems/game/utils/lerpAngle.js";

class SnakeBody extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();

    this.meshes.body.castShadow = true;
    this.meshes.body.receiveShadow = true;

    this.add(this.meshes.body);
  }

  tick(delta, elapsedTime, stepTime, stepPosition) {
    if (this.newPosition) {
      let positionX =
        this.oldPosition.x +
        ((this.newPosition.x - this.oldPosition.x) / stepTime) * stepPosition;

      let positionZ =
        this.oldPosition.z +
        ((this.newPosition.z - this.oldPosition.z) / stepTime) * stepPosition;

      this.position.set(positionX * 1.5, 0.7, positionZ * 1.5);
    }

    if (this.newRotation) {
      let RotationY = lerpAngle(
        this.oldRotation.y,
        this.newRotation.y,
        stepPosition / stepTime
      );

      this.rotation.set(0, RotationY, 0);
    }
  }
}

export { SnakeBody };
