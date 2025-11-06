import { Group } from "three";

import { createGroups } from "./groups.js";

class Cloud extends Group {
  constructor() {
    super();

    this.groups = createGroups();

    this.add(this.groups.cloud);
  }
}

export { Cloud };
