import { Group, MathUtils } from "three";

import { createMeshes } from "./meshes.js";
import { createLights } from "./lights.js";

// import { SpotLightHelper } from "three";
const radiansPerSecond = MathUtils.degToRad(30);

class Fruit extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();
    this.lights = createLights();

    // this.spotLightHelper = new SpotLightHelper(this.lights.spotLight);

    this.meshes.fruit.position.set(0, 0.2, 0);

    this.lights.spotLight.position.set(1, 5, 1);
    this.lights.spotLight.target = this.meshes.fruit;

    this.meshes.fruit.castShadow = true;

    this.add(
      this.meshes.fruit,
      this.lights.spotLight,
      this.lights.spotLight.target
      // this.spotLightHelper
    );
  }

  tick(delta, elapsedTime, stepTime, stepPosition) {
    // increase the cube's rotation each frame
    // this.meshes.fruit.rotation.z += radiansPerSecond * delta;
    this.meshes.fruit.rotation.x += radiansPerSecond * delta;
    this.meshes.fruit.rotation.y += radiansPerSecond * delta;
  }
}

export { Fruit };
