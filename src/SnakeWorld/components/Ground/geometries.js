import { PlaneBufferGeometry } from "three";

function createGeometries() {
  const plane = new PlaneBufferGeometry(100, 100, 1, 1);

  return {
    plane,
  };
}

export { createGeometries };
