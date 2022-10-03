import { SphereBufferGeometry } from "three";

function createGeometries() {
  const smoke = new SphereBufferGeometry(1, 16, 16);

  return {
    smoke,
  };
}

export { createGeometries };
