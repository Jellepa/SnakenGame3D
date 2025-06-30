import { BoxGeometry } from "three";

function createGeometries() {
  const specialFruit = new BoxGeometry(0.6, 0.6, 0.6);

  return { specialFruit };
}

export { createGeometries };
