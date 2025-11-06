import { Group } from "three";
import { createMeshes } from "./meshes.js";

function createGroups() {
  const cloud = new Group();

  const meshes = createMeshes();

  const CloudHeight = 4;

  for (let i = 0; i < 1; i += 0.01) {
    let min = 0.7 + i;
    let max = 2.5 + i;

    const cloudParticle = meshes.protoCloud.clone();
    cloudParticle.position.x =
      i * CloudHeight * (Math.random() * (max - min) + min);
    cloudParticle.position.y =
      i * CloudHeight * (Math.random() * (max - min) + min);
    cloudParticle.position.z =
      i * CloudHeight * (Math.random() * (max - min) + min);
    cloudParticle.scale.x = Math.random() * (max - min) + min;
    cloudParticle.scale.y = cloudParticle.scale.x;
    cloudParticle.scale.z = cloudParticle.scale.x;

    cloudParticle.random = Math.random();

    cloud.add(cloudParticle);
  }

  cloud.scale.set(0.4, 0.4, 0.4);
  cloud.position.set(-2, 3, 0);

  return {
    cloud,
  };
}

export { createGroups };
