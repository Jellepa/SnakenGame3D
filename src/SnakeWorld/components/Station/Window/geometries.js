import { BoxBufferGeometry, CylinderBufferGeometry } from "three";

function createGeometries() {
  const window = new BoxBufferGeometry(1, 1, 0.05);
  const windowBar = new BoxBufferGeometry(0.1, 1.1, 0.1);

  return {
    window,
    windowBar,
  };
}

export { createGeometries };
