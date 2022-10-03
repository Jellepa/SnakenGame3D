const snakeDirections = ["UP", "RIGHT", "DOWN", "LEFT"];

function updateDirection(e, gameState) {
  let index = snakeDirections.indexOf(gameState.currentSnakeDirection);

  if (e.key === "ArrowLeft" || e.code === "KeyA") {
    if (index === 0) {
      gameState.currentSnakeDirection = snakeDirections[3];
    } else {
      gameState.currentSnakeDirection = snakeDirections[index - 1];
    }
  } else if (e.key === "ArrowRight" || e.code === "KeyD") {
    if (index === 3) {
      gameState.currentSnakeDirection = snakeDirections[0];
    } else {
      gameState.currentSnakeDirection = snakeDirections[index + 1];
    }
  }
}

export { updateDirection };
