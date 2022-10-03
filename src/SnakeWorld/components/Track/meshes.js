import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const wood = new Mesh(geometries.wood, materials.wood);
  wood.position.set(0, 0, 6);

  const wood2 = wood.clone();
  wood.position.set(0.5, 0, 6);

  const wood3 = wood.clone();
  wood.position.set(1, 0, 6);

  const wood4 = wood.clone();
  wood.position.set(1.5, 0, 6);

  const wood5 = wood.clone();
  wood.position.set(2, 0, 6);

  const wood6 = wood.clone();
  wood.position.set(2.5, 0, 6);

  const wood7 = wood.clone();
  wood.position.set(-0.5, 0, 6);

  const wood8 = wood.clone();
  wood.position.set(-1, 0, 6);

  const wood9 = wood.clone();
  wood.position.set(-1.5, 0, 6);

  const wood10 = wood.clone();
  wood.position.set(-2, 0, 6);

  const metal = new Mesh(geometries.metal, materials.metal);
  metal.position.set(0, 0, 5.2);

  const metal2 = metal.clone();
  metal2.position.set(0, 0, 6.8);

  return {
    wood,
    wood2,
    wood3,
    wood4,
    wood5,
    wood6,
    wood7,
    wood8,
    wood9,
    wood10,
    metal,
    metal2,
  };
}

export { createMeshes };
