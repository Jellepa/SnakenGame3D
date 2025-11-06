import { PlaneGeometry } from "three";

function createGeometries() {
  const plane = new PlaneGeometry(100, 100, 1, 1);

  return {
    plane,
  };
}

export { createGeometries };
