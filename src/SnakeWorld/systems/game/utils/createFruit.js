function createFruit() {
  var x = Math.round(Math.random() * 9);
  var z = Math.round(Math.random() * 9);

  /* 
  THIS IS SHIT, FIX THIS
  if (gameState != null) {
    console.log(
      "1",
      x === gameState.snakeHead.newPosition.x &&
        z === gameState.snakeHead.newPosition.z
    );

    if (gameState.snakeTail.newPositions.length > 0) {
      if (
        gameState.snakeTail.newPositions.findIndex(
          (position) => position.x == x && position.z == z
        ) > 0
      ) {
        x = Math.round(Math.random() * 9);
        z = Math.round(Math.random() * 9);
        console.log("2");
      }
    }
  } */

  return { x: x, z: z };
}

export { createFruit };
