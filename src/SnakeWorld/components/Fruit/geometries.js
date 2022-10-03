import { BoxBufferGeometry } from "three";

function createGeometries() {
  const fruit = new BoxBufferGeometry(0.8, 0.8, 0.8);

  return {
    fruit,
  };
}

export { createGeometries };
