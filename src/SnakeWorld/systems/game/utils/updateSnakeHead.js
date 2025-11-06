function updateSnakeHead(gameState) {
  const oldPosition = { ...gameState.snakeHead.newPosition };

  const oldRotation = { ...gameState.snakeHead.newRotation };

  gameState.snakeHead.oldPosition = oldPosition;

  gameState.snakeHead.oldRotation = oldRotation;

  // Apply pending direction change if there is one
  if (gameState.pendingDirection) {
    gameState.currentSnakeDirection = gameState.pendingDirection;
    gameState.pendingDirection = null; // Clear the buffer
  }

  if (gameState.currentSnakeDirection == "UP") {
    gameState.snakeHead.newPosition.z -= 1;
    gameState.snakeHead.newRotation.y = Math.PI / 2;
  }
  if (gameState.currentSnakeDirection == "DOWN") {
    gameState.snakeHead.newPosition.z += 1;
    gameState.snakeHead.newRotation.y = -Math.PI / 2;
  }
  if (gameState.currentSnakeDirection == "LEFT") {
    gameState.snakeHead.newPosition.x -= 1;
    gameState.snakeHead.newRotation.y = Math.PI;
  }
  if (gameState.currentSnakeDirection == "RIGHT") {
    gameState.snakeHead.newPosition.x += 1;
    gameState.snakeHead.newRotation.y = 0;
  }

  // bunch of if statements to correct "outOfField"
  if (gameState.snakeHead.newPosition.z < 0) {
    gameState.snakeHead.newPosition.z = 9;
  }
  if (gameState.snakeHead.newPosition.z > 9) {
    gameState.snakeHead.newPosition.z = 0;
  }
  if (gameState.snakeHead.newPosition.x < 0) {
    gameState.snakeHead.newPosition.x = 9;
  }
  if (gameState.snakeHead.newPosition.x > 9) {
    gameState.snakeHead.newPosition.x = 0;
  }
}

export { updateSnakeHead };
