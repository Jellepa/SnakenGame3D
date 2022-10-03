import { BoxBufferGeometry } from "three";

function createGeometries() {
  const wood = new BoxBufferGeometry(0.1, 0.1, 2);
  const metal = new BoxBufferGeometry(5, 0.2, 0.2);

  return {
    wood,
    metal,
  };
}

export { createGeometries };
