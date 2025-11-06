import { Group } from "three";

import { createMeshes } from "./meshes.js";
import { lerpAngle } from "../../systems/game/utils/lerpAngle.js";

class SnakeBody extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();

    this.meshes.body.castShadow = true;
    this.meshes.body.receiveShadow = true;

    // Create pivot group for rotation around one end
    this.pivot = new Group();

    // Move the mesh position relative to the pivot
    // The capsule geometry (radius 0.4, height 0.6) rotated π/2 on Z
    // has total length ~1.4 and lies along X axis
    // Position the mesh so its front end is at the pivot origin
    this.meshes.body.position.set(-0.7, 0.7, 0);

    // Add mesh to pivot, then pivot to group
    this.pivot.add(this.meshes.body);
    this.add(this.pivot);
  }

  tick(delta, elapsedTime, stepTime, stepPosition) {
    if (this.newPosition) {
      let positionX =
        this.oldPosition.x +
        ((this.newPosition.x - this.oldPosition.x) / stepTime) * stepPosition;

      let positionZ =
        this.oldPosition.z +
        ((this.newPosition.z - this.oldPosition.z) / stepTime) * stepPosition;

      // Position the group (which contains the pivot)
      // Add Y offset to match snake head positioning (head is at Y=0.7, mesh adds another 0.7)
      this.position.set(positionX * 1.5, 0.7, positionZ * 1.5);
    }

    if (this.newRotation) {
      let RotationY = lerpAngle(
        this.oldRotation.y,
        this.newRotation.y,
        stepPosition / stepTime
      );

      // Rotate the pivot instead of the group
      // This makes the segment rotate around its back end (where the pivot is)
      this.pivot.rotation.set(0, RotationY, 0);
    }
  }
}

export { SnakeBody };
