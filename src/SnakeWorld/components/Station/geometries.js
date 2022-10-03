import { BoxBufferGeometry, CylinderBufferGeometry } from "three";

function createGeometries() {
  const roof = new CylinderBufferGeometry(0.7, 0.7, 1, 3);
  const wood = new BoxBufferGeometry(1, 1);

  const window = new BoxBufferGeometry(1, 1, 0.05);
  const windowBar = new BoxBufferGeometry(0.1, 1.1, 0.1);

  return {
    wood,
    roof,
    window,
    windowBar,
  };
}

export { createGeometries };
