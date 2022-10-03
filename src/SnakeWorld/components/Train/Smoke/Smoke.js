import { Group } from "three";

import { createGroups } from "./groups.js";

let elapsedTime = 0;

class Smoke extends Group {
  constructor() {
    super();

    this.groups = createGroups();

    this.add(this.groups.smoke);
    console.log(this.groups.smoke.children[1].random);
  }

  tick(delta) {
    elapsedTime += delta;
    let speed = elapsedTime / 10;

    let min = 1;
    let max = 2.5;

    const lenght = this.groups.smoke.children.length;

    for (let i = 0; i < lenght; i++) {
      let j = i / 100;
      let child = groups.smoke.children[i];

      child.scale.x =
        Math.abs(Math.cos(2 * Math.PI * (speed * child.random)) * j) *
          (max - min) +
        min;
      child.scale.y = child.scale.x;
      child.scale.z = child.scale.x;
    }

    /* this.groups.smoke.children.forEach((child) => {
      let i = this.groups.smoke.children.indexOf(child);
      let j = i / 100;

      child.scale.x =
        Math.abs(Math.cos(2 * Math.PI * (speed * child.random)) * j) *
          (max - min) +
        min;
      child.scale.y = child.scale.x;
      child.scale.z = child.scale.x;
    }); */
  }
}

export { Smoke };
