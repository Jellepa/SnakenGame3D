import { Group, MathUtils } from "three";

import { createMeshes } from "./meshes.js";
import { createLights } from "./lights.js";

const radiansPerSecond = MathUtils.degToRad(30); // Same rotation speed as normal fruit

class SpecialFruit extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();
    this.lights = createLights();

    console.log("SpecialFruit lights:", this.lights); // Debug log

    this.meshes.specialFruit.position.set(0, 0.2, 0);

    this.lights.spotLight.position.set(1, 5, 1);
    this.lights.spotLight.target = this.meshes.specialFruit;

    this.meshes.specialFruit.castShadow = true;

    this.add(
      this.meshes.specialFruit,
      this.lights.rectLight,
      this.lights.spotLight,
      this.lights.spotLight.target
    );

    // Timer for self-destruction
    this.timeAlive = 0;
    this.maxLifetime = 12; // 12 seconds

    console.log("SpecialFruit created with purple spotlight"); // Debug log
  }

  tick(delta, elapsedTime, stepTime, stepPosition) {
    // Same rotation as normal fruit
    this.meshes.specialFruit.rotation.x += radiansPerSecond * delta;
    this.meshes.specialFruit.rotation.y += radiansPerSecond * delta;

    // Track lifetime
    this.timeAlive += delta;
  }

  isExpired() {
    return this.timeAlive >= this.maxLifetime;
  }

  getRemainingTime() {
    return Math.max(0, this.maxLifetime - this.timeAlive);
  }
}

export { SpecialFruit };
