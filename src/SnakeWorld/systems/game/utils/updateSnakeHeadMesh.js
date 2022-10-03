function updateSnakeHeadMesh(gameState, snakeHeadMesh) {
  snakeHeadMesh.newPosition = {
    x: 1.5 * gameState.snakeHead.newPosition.x,
    y: 0.7,
    z: 1.5 * gameState.snakeHead.newPosition.z,
  };

  snakeHeadMesh.oldPosition = {
    x: 1.5 * gameState.snakeHead.oldPosition.x,
    y: 0.7,
    z: 1.5 * gameState.snakeHead.oldPosition.z,
  };

  snakeHeadMesh.newRotation = {
    x: 0,
    y: gameState.snakeHead.newRotation.y,
    z: 0,
  };

  snakeHeadMesh.oldRotation = {
    x: 0,
    y: gameState.snakeHead.oldRotation.y,
    z: 0,
  };
}
export { updateSnakeHeadMesh };
