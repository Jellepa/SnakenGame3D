import { BoxBufferGeometry } from "three";

function createGeometries() {
  const tile = new BoxBufferGeometry(1, 1, 1);

  return {
    tile,
  };
}

export { createGeometries };
