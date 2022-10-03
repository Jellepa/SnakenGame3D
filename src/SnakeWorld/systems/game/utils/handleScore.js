import { createFruit } from "./createFruit";
import { playSounds } from "./playSounds";

const eatFruit = require("./../../../../assets/sounds/eatFruit.mp3");

// const audio = document.createElement("audio");
// audio.src = eatFruit;
// audio.volume = 0.2;

function handleScore(gameState, gameSettings, scoreBoard) {
  if (
    gameState.fruit.x === gameState.snakeHead.newPosition.x &&
    gameState.fruit.z === gameState.snakeHead.newPosition.z
  ) {
    // audio.play();
    playSounds(eatFruit, gameSettings.audio);
    gameState.score += 10;
    gameState.snakeTail.tailLength += 1;

    let fruit = createFruit(gameState);

    console.log("fruit", fruit);

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

    console.log("fruit", fruit);

    gameState.fruit = fruit;
    scoreBoard.innerHTML = "Score: " + gameState.score;
  }
}
export { handleScore };
