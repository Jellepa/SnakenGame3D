import { CapsuleBufferGeometry, SphereBufferGeometry } from "three";

function createGeometries() {
  const head = new CapsuleBufferGeometry(0.4, 0.6, 2, 8);

  const eye = new SphereBufferGeometry(0.15, 4, 4);

  return {
    head,
    eye,
  };
}

export { createGeometries };
