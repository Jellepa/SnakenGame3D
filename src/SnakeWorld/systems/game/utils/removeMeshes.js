function removeMeshes(
  scene,
  loop,
  fruitMesh,
  snakeHeadMesh,
  snakeTailMeshArray
) {
  const length = snakeTailMeshArray.length;

  for (let i = 0; i < length; i++) {
    scene.remove(snakeTailMeshArray[i]);
    loop.updatables.splice(loop.updatables.indexOf(snakeTailMeshArray[i]), 1);
  }

  scene.remove(fruitMesh, snakeHeadMesh);
  loop.updatables.splice(loop.updatables.indexOf(fruitMesh), 1);
  loop.updatables.splice(loop.updatables.indexOf(snakeHeadMesh), 1);
}

export { removeMeshes };
