const updateMiniMap = (gameState, miniMap) => {
  const miniMapContext = miniMap.getContext("2d");

  // the arena
  miniMapContext.fillStyle = "#bbbbbb";
  miniMapContext.clearRect(50, 50, 100, 100);
  miniMapContext.fillRect(53, 53, 94, 94);

  miniMapContext.fillStyle = "DeepSkyBlue ";
  miniMapContext.fillRect(
    50 + gameState.snakeHead.newPosition.x * 10,
    50 + gameState.snakeHead.newPosition.z * 10,
    10,
    10
  );

  const length = gameState.snakeTail.newPositions.length;

  for (let i = 0; i < length; i++) {
    miniMapContext.fillRect(
      50 + gameState.snakeTail.newPositions[i].x * 10,
      50 + gameState.snakeTail.newPositions[i].z * 10,
      10,
      10
    );
  }

  miniMapContext.fillStyle = "Gold ";
  miniMapContext.fillRect(
    50 + gameState.fruit.x * 10,
    50 + gameState.fruit.z * 10,
    10,
    10
  );
};

export { updateMiniMap };
