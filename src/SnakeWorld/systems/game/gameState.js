import { createFruit } from "./utils/createFruit";

function createGameState() {
  return {
    currentSnakeDirection: "UP",
    pendingDirection: null, // Simple input buffer - just store the last input
    snakeHead: {
      oldPosition: { x: 5, z: 5 },
      newPosition: { x: 5, z: 5 },
      oldRotation: { y: Math.PI / 2 },
      newRotation: { y: Math.PI / 2 },
    },
    snakeTail: {
      oldPositions: [],
      newPositions: [],
      oldRotations: [],
      newRotations: [],
      tailLength: 0,
    },
    fruit: createFruit(),
    specialFruit: {
      active: false,
      position: null,
      spawnCounter: 0, // Tracks fruit spawns to determine when to spawn special fruit
    },
    running: false,
    score: 0,
    speed: 40,
    gameOver: false,
    audio: true,
  };
}

export { createGameState };
