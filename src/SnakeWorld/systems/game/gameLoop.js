import { handleScore } from "./utils/handleScore";
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
  miniMap
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
};

export { gameLoop };
