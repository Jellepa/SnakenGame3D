import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const window = new Mesh(geometries.window, materials.window);

  const windowBarStandingCenter = new Mesh(
    geometries.windowBar,
    materials.windowBar
  );
  const windowBarStandingLeft = windowBarStandingCenter.clone();
  windowBarStandingLeft.position.set(-0.5, 0, 0);
  const windowBarStandingRight = windowBarStandingCenter.clone();
  windowBarStandingRight.position.set(0.5, 0, 0);

  const windowBarFlatBottom = windowBarStandingCenter.clone();
  windowBarFlatBottom.position.set(0, -0.5, 0);
  windowBarFlatBottom.rotation.z = Math.PI / 2;

  const windowBarFlatCenter = windowBarStandingCenter.clone();
  windowBarFlatCenter.rotation.z = Math.PI / 2;

  const windowBarFlatTop = windowBarStandingCenter.clone();
  windowBarFlatTop.position.set(0, 0.5, 0);
  windowBarFlatTop.rotation.z = Math.PI / 2;

  return {
    window,
    windowBarStandingCenter,
    windowBarStandingLeft,
    windowBarStandingRight,
    windowBarFlatBottom,
    windowBarFlatCenter,
    windowBarFlatTop,
  };
}

export { createMeshes };
