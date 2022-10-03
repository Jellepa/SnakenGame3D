import { CylinderBufferGeometry } from "three";

function createGeometries() {
  const wood = new CylinderBufferGeometry(0.5, 0.5, 1);
  const leaf = new CylinderBufferGeometry(0, 1, 2);

  return {
    wood,
    leaf,
  };
}

export { createGeometries };
