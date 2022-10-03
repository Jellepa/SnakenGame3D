import { World } from "./SnakeWorld/World.js";
import "./styles/main.css";

async function main() {
  // Get a reference to the container element
  const container = document.getElementById("scene-container");

  const onTop = document.getElementById("onTop");

  // 1. Create an instance of the World app

  const world = new World(container, onTop);

  // complete async tasks

  // await world.init();

  // 2. Render the scene

  // world.render();

  // start the animation loop
  world.start();
}

main().catch((err) => {
  console.error(err);
});
