import { createFruit } from "./createFruit";
import {
  shouldSpawnSpecialFruit,
  createSpecialFruit,
} from "./createSpecialFruit";
import { playSounds } from "./playSounds";
import { playSpecialFruitSound } from "./playSpecialFruitSound";

const eatFruit = require("./../../../../assets/sounds/eatFruit.mp3");

function handleScore(gameState, gameSettings, scoreBoard) {
  // Check for regular fruit collection
  if (
    gameState.fruit.x === gameState.snakeHead.newPosition.x &&
    gameState.fruit.z === gameState.snakeHead.newPosition.z
  ) {
    playSounds(eatFruit, gameSettings.audio);
    gameState.score += 10;
    gameState.snakeTail.tailLength += 1;

    let fruit = createFruit(gameState);

    // THIS IS SHIT, FIX THIS
    // It is still possible to have a new value that is also within the body of the snake
    if (gameState != null) {
      if (
        fruit.x === gameState.snakeHead.newPosition.x &&
        fruit.z === gameState.snakeHead.newPosition.z
      ) {
        fruit = createFruit(gameState);
        console.log("1");
      } else if (gameState.snakeTail.newPositions.length > 0) {
        if (
          gameState.snakeTail.newPositions.findIndex(
            (position) => position.x === fruit.x && position.z === fruit.z
          ) > 0
        ) {
          fruit = createFruit(gameState);
          console.log("2");
        }
      }
    }
    gameState.fruit = fruit;

    // Check if we should spawn a special fruit
    if (shouldSpawnSpecialFruit(gameState)) {
      const specialFruitPosition = createSpecialFruit(gameState);
      gameState.specialFruit.active = true;
      gameState.specialFruit.position = specialFruitPosition;
      console.log("Special fruit spawned!", specialFruitPosition);
    }

    scoreBoard.innerHTML = "Score: " + gameState.score;
  }

  // Check for special fruit collection
  if (
    gameState.specialFruit.active &&
    gameState.specialFruit.position &&
    gameState.specialFruit.position.x === gameState.snakeHead.newPosition.x &&
    gameState.specialFruit.position.z === gameState.snakeHead.newPosition.z
  ) {
    playSpecialFruitSound(eatFruit, gameSettings.audio); // Special double-speed sound
    gameState.score += 25; // Bonus points for special fruit
    gameState.snakeTail.tailLength += 1; // Also grows the snake (same as normal)

    // Remove special fruit
    gameState.specialFruit.active = false;
    gameState.specialFruit.position = null;

    console.log("Special fruit collected! +25 points");
    scoreBoard.innerHTML = "Score: " + gameState.score;
  }
}
export { handleScore };
