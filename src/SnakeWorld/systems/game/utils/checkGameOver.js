function checkGameOver(gameState) {
  const length = gameState.snakeTail.newPositions.length;

  if (length > 0) {
    for (let i = 0; i < length; i++) {
      if (
        gameState.snakeTail.newPositions[i].x ===
          gameState.snakeHead.newPosition.x &&
        gameState.snakeTail.newPositions[i].z ===
          gameState.snakeHead.newPosition.z
      ) {
        gameState.gameOver = true;
      }
    }
  }
}
export { checkGameOver };
