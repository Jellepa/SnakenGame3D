import { SphereBufferGeometry } from "three";

function createGeometries() {
  const cloud = new SphereBufferGeometry(1, 16, 16);

  return {
    cloud,
  };
}

export { createGeometries };
