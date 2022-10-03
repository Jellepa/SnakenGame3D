import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const window = new Mesh(geometries.window, materials.window);

  const windowBarStandingLeft = new Mesh(
    geometries.windowBar,
    materials.windowBar
  );
  windowBarStandingLeft.position.set(-0.5, 0, 0);

  const windowBarStandingRight = windowBarStandingLeft.clone();
  windowBarStandingRight.position.set(0.5, 0, 0);

  const windowBarFlatBottom = windowBarStandingLeft.clone();
  windowBarFlatBottom.position.set(0, -0.5, 0);
  windowBarFlatBottom.rotation.z = Math.PI / 2;

  const windowBarFlatTop = windowBarStandingLeft.clone();
  windowBarFlatTop.position.set(0, 0.5, 0);
  windowBarFlatTop.rotation.z = Math.PI / 2;

  return {
    window,

    windowBarStandingLeft,
    windowBarStandingRight,
    windowBarFlatBottom,
    windowBarFlatTop,
  };
}

export { createMeshes };
