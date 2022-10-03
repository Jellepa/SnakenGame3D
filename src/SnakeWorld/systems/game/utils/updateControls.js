function updateControls(controls, gameState, snakeHeadMesh) {
  if (controls.goTo) {
    controls.comeFrom = { ...controls.goTo };
  }

  // controls.stepTime = gameSettings.stepTime;

  controls.goTo = {
    cameraPosition: {
      x: snakeHeadMesh.position.x,
      y: 10,
      z: snakeHeadMesh.position.z,
    },
    targetPosition: {
      x: snakeHeadMesh.position.x,
      y: 1.7,
      z: snakeHeadMesh.position.z,
    },
  };

  if (gameState.currentSnakeDirection === "UP") {
    controls.goTo.cameraPosition.z += 15;
  }
  if (gameState.currentSnakeDirection === "DOWN") {
    controls.goTo.cameraPosition.z -= 15;
  }
  if (gameState.currentSnakeDirection === "RIGHT") {
    controls.goTo.cameraPosition.x -= 15;
  }
  if (gameState.currentSnakeDirection === "LEFT") {
    controls.goTo.cameraPosition.x += 15;
  }
}
export { updateControls };
