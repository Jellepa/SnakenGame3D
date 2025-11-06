import { Group } from "three";
import { createMeshes } from "./meshes.js";

function createGroups() {
  const smoke = new Group();

  const meshes = createMeshes();

  const SmokeHight = 4;

  for (let i = 0; i < 1; i += 0.01) {
    let min = 0.7 + i;
    let max = 2.5 + i;

    const smokeParticle = meshes.protoSmoke.clone();
    smokeParticle.position.x =
      i * SmokeHight * (Math.random() * (max - min) + min);
    smokeParticle.position.y =
      i * SmokeHight * (Math.random() * (max - min) + min);
    smokeParticle.position.z =
      i * SmokeHight * (Math.random() * (max - min) + min);
    smokeParticle.scale.x = Math.random() * (max - min) + min;
    smokeParticle.scale.y = smokeParticle.scale.x;
    smokeParticle.scale.z = smokeParticle.scale.x;

    smokeParticle.random = Math.random();

    smoke.add(smokeParticle);
  }

  smoke.scale.set(0.4, 0.4, 0.4);
  smoke.position.set(-2, 3, 0);

  return {
    smoke,
  };
}

export { createGroups };
