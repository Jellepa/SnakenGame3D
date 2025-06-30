function shouldSpawnSpecialFruit(gameState) {
  // Increment the spawn counter each time a fruit is created
  gameState.specialFruit.spawnCounter++;

  // Average 1 in 7 chance (but random)
  // We use a random threshold between 5-9 to add variance
  const spawnThreshold = Math.floor(Math.random() * 5) + 5; // Random between 5-9

  if (gameState.specialFruit.spawnCounter >= spawnThreshold) {
    gameState.specialFruit.spawnCounter = 0; // Reset counter
    return true;
  }

  return false;
}

function createSpecialFruit(gameState) {
  var x = Math.round(Math.random() * 9);
  var z = Math.round(Math.random() * 9);

  // Collision avoidance with snake head, tail, AND regular fruit
  let attempts = 0;
  const maxAttempts = 20; // Prevent infinite loops

  while (attempts < maxAttempts) {
    let collision = false;

    // Check collision with snake head
    if (
      x === gameState.snakeHead.newPosition.x &&
      z === gameState.snakeHead.newPosition.z
    ) {
      collision = true;
    }

    // Check collision with snake tail
    if (!collision && gameState.snakeTail.newPositions.length > 0) {
      if (
        gameState.snakeTail.newPositions.findIndex(
          (position) => position.x === x && position.z === z
        ) >= 0
      ) {
        collision = true;
      }
    }

    // Check collision with regular fruit
    if (!collision && gameState.fruit) {
      if (x === gameState.fruit.x && z === gameState.fruit.z) {
        collision = true;
      }
    }

    if (!collision) {
      break; // Found a valid position
    }

    // Generate new position
    x = Math.round(Math.random() * 9);
    z = Math.round(Math.random() * 9);
    attempts++;
  }

  return { x: x, z: z };
}

export { shouldSpawnSpecialFruit, createSpecialFruit };
