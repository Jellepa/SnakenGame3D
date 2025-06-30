const snakeDirections = ["UP", "RIGHT", "DOWN", "LEFT"];

// Function to get the opposite direction
function getOppositeDirection(direction) {
  const index = snakeDirections.indexOf(direction);
  return snakeDirections[(index + 2) % 4];
}

// Function to check if a direction change would cause immediate self-collision
function wouldCauseCollision(currentDirection, newDirection, snakeTail) {
  // If there's no tail, no collision possible
  if (snakeTail.tailLength === 0) return false;

  // Check if the new direction is opposite to current (180-degree turn)
  return getOppositeDirection(currentDirection) === newDirection;
}

// Smart input buffer that works with the existing step-based system
function updateDirectionSafe(e, gameState) {
  const snakeDirections = ["UP", "RIGHT", "DOWN", "LEFT"];
  let index = snakeDirections.indexOf(gameState.currentSnakeDirection);
  let newDirection = null;

  // Determine the requested new direction
  if (
    e.key === "ArrowLeft" ||
    e.code === "KeyA" ||
    e.target.classList.value === "left"
  ) {
    newDirection =
      index === 0 ? snakeDirections[3] : snakeDirections[index - 1];
  } else if (
    e.key === "ArrowRight" ||
    e.code === "KeyD" ||
    e.target.classList.value === "right"
  ) {
    newDirection =
      index === 3 ? snakeDirections[0] : snakeDirections[index + 1];
  }

  // If no valid direction input, return
  if (!newDirection) return;

  // Check if this would cause immediate collision (opposite direction)
  if (
    wouldCauseCollision(
      gameState.currentSnakeDirection,
      newDirection,
      gameState.snakeTail
    )
  ) {
    console.log("Blocked dangerous 180-degree turn to prevent self-collision");
    return;
  }

  // Simply store the latest valid input - the game loop will apply it at the right time
  gameState.pendingDirection = newDirection;
  console.log(`Buffered direction change to ${newDirection}`);
}

export { updateDirectionSafe, getOppositeDirection, wouldCauseCollision };
