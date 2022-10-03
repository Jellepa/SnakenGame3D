import { CapsuleBufferGeometry } from "three";

function createGeometries() {
  const body = new CapsuleBufferGeometry(0.4, 0.6, 2, 8);
  return {
    body,
  };
}

export { createGeometries };
