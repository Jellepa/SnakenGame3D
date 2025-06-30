function updateSpecialFruit(gameState, specialFruitMesh) {
  // If special fruit is active but expired, remove it
  if (
    gameState.specialFruit.active &&
    specialFruitMesh &&
    specialFruitMesh.isExpired()
  ) {
    gameState.specialFruit.active = false;
    gameState.specialFruit.position = null;
    console.log("Special fruit expired after 12 seconds");
    return true; // Indicates special fruit was removed
  }

  return false;
}

export { updateSpecialFruit };
