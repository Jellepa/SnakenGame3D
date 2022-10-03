function updateSnakeTail(gameState) {
  const oldPositions = { ...gameState.snakeTail.newPositions };

  const oldRotations = { ...gameState.snakeTail.newRotations };

  gameState.snakeTail.oldPositions = oldPositions;

  gameState.snakeTail.oldRotations = oldRotations;

  // updating tail positions

  gameState.snakeTail.newPositions.unshift(gameState.snakeHead.oldPosition);
  if (
    gameState.snakeTail.newPositions.length > gameState.snakeTail.tailLength
  ) {
    gameState.snakeTail.newPositions.pop();
  }

  // updating tail rotations

  gameState.snakeTail.newRotations.unshift(gameState.snakeHead.oldRotation);
  if (
    gameState.snakeTail.newRotations.length > gameState.snakeTail.tailLength
  ) {
    gameState.snakeTail.newRotations.pop();
  }
}

export { updateSnakeTail };
