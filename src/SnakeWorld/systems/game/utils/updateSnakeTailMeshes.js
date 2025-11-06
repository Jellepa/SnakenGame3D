import { SnakeBody } from "../../../components/SnakeBody/SnakeBody.js";

function updateSnakeTailMeshes(
  gameState,
  snakeTailMeshArray,
  snakeTailMesh,
  loop,
  scene
) {
  // Making sure the snake grows and doesn't spawn in a corner
  if (gameState.snakeTail.tailLength > snakeTailMeshArray.length) {
    // Instead of cloning, create a new SnakeBody instance to avoid cloning issues
    // with the pivot hierarchy
    let newMesh = new SnakeBody();

    if (
      gameState.snakeTail.newPositions[0] &&
      gameState.snakeTail.oldPositions[0]
    ) {
      newMesh.oldPosition = gameState.snakeTail.oldPositions[0];
      newMesh.newPosition = gameState.snakeTail.newPositions[0];
      newMesh.oldRotation = gameState.snakeTail.oldRotations[0];
      newMesh.newRotation = gameState.snakeTail.newRotations[0];
    }
    // else ??
    snakeTailMeshArray.push(newMesh);
    loop.updatables.push(newMesh);
    scene.add(newMesh);
  }

  for (let i = 0; i < gameState.snakeTail.tailLength; i++) {
    if (
      gameState.snakeTail.newPositions[i] &&
      gameState.snakeTail.oldPositions[i]
    ) {
      snakeTailMeshArray[i].oldPosition = gameState.snakeTail.oldPositions[i];

      snakeTailMeshArray[i].newPosition = gameState.snakeTail.newPositions[i];

      snakeTailMeshArray[i].oldRotation = gameState.snakeTail.oldRotations[i];

      snakeTailMeshArray[i].newRotation = gameState.snakeTail.newRotations[i];
    }
    // else ??
  }
}

export { updateSnakeTailMeshes };
