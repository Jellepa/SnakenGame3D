import { createFruit } from "./utils/createFruit";

function createGameState() {
  return {
    currentSnakeDirection: "UP",
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
    running: false,
    score: 0,
    speed: 40,
    gameOver: false,
    audio: true,
  };
}

export { createGameState };
