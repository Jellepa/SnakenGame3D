import { handleScore } from "./utils/handleScore";
import { updateSpecialFruit } from "./utils/updateSpecialFruit";
import { checkGameOver } from "./utils/checkGameOver";
import { handleGameOver } from "./utils/handleGameOver";
import { updateSnakeHead } from "./utils/updateSnakeHead";
import { updateSnakeHeadMesh } from "./utils/updateSnakeHeadMesh";
import { updateSnakeTail } from "./utils/updateSnakeTail";
import { updateSnakeTailMeshes } from "./utils/updateSnakeTailMeshes";
import { updateMiniMap } from "./utils/updateMiniMap";
import { updateControls } from "./utils/updateControls";

const gameLoop = async (
  gameState,
  gameSettings,
  scoreBoard,
  modal,
  highScore,
  highScoreBoard,
  controls,
  loop,
  fruitMesh,
  snakeHeadMesh,
  snakeTailMesh,
  snakeTailMeshArray,
  scene,
  miniMap,
  specialFruitMesh = null
) => {
  handleScore(gameState, gameSettings, scoreBoard);

  checkGameOver(gameState);

  if (gameState.gameOver) {
    handleGameOver(
      gameState,
      modal,
      highScore,
      highScoreBoard,
      controls,
      loop,
      gameSettings.stepTime,
      fruitMesh,
      snakeHeadMesh,
      snakeTailMeshArray,
      scene
    );
  }

  fruitMesh.position.set(1.5 * gameState.fruit.x, 0.7, 1.5 * gameState.fruit.z);

  // Handle special fruit timing and positioning
  let specialFruitRemoved = false;
  if (specialFruitMesh) {
    if (updateSpecialFruit(gameState, specialFruitMesh)) {
      // Special fruit expired, remove it from scene and loop
      scene.remove(specialFruitMesh);
      const specialFruitIndex = loop.updatables.indexOf(specialFruitMesh);
      if (specialFruitIndex !== -1) {
        loop.updatables.splice(specialFruitIndex, 1);
      }
      specialFruitRemoved = true;
    } else if (
      gameState.specialFruit.active &&
      gameState.specialFruit.position
    ) {
      // Update special fruit position
      specialFruitMesh.position.set(
        1.5 * gameState.specialFruit.position.x,
        0.7,
        1.5 * gameState.specialFruit.position.z
      );
    }
  }

  // Return indication if special fruit was removed
  const result = { specialFruitRemoved };

  // updating the head

  updateSnakeHead(gameState);

  updateSnakeHeadMesh(gameState, snakeHeadMesh);

  // updating the tail

  updateSnakeTail(gameState);

  updateSnakeTailMeshes(
    gameState,
    snakeTailMeshArray,
    snakeTailMesh,
    loop,
    scene
  );

  updateMiniMap(gameState, miniMap);

  updateControls(controls, gameState, snakeHeadMesh);

  return result;
};

export { gameLoop };
