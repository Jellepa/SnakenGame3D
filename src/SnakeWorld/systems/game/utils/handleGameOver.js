import { setModal } from "./setModal";
import { playSounds } from "./playSounds";

const gameOver = require("../../../../assets/sounds/gameOver.mp3");

// Simple animation helper function
function animateSnakeDeath(snakeHeadMesh, snakeTailMeshArray, controls, onComplete) {
  // Get the camera from the controls
  const camera = controls.object; // OrbitControls stores camera reference in .object property
  const brownColor = { r: 0.545, g: 0.271, b: 0.075 }; // Brown color RGB (0x8B4513)
  const animationDuration = 4000; // 4 seconds total
  const colorDuration = 1500; // 1.5 seconds to turn brown
  const sinkDelay = 1000; // Start sinking 1 second after color change begins
  const sinkDuration = 2500; // 2.5 seconds to sink
  const cameraAnimationDuration = 3500; // 3.5 seconds for camera zoom out

  let startTime = null;
  const allParts = [snakeHeadMesh, ...snakeTailMeshArray].filter(
    (part) => part
  );

  // Set up camera animation - store initial camera position from actual camera
  const initialCameraPosition = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  };
  
  const initialTargetPosition = {
    x: controls.target.x,
    y: controls.target.y,
    z: controls.target.z
  };

  // Define final overview camera position (higher and further back for full field view)
  const finalCameraPosition = { x: 7.5, y: 45, z: 7.5 };
  const finalTargetPosition = { x: 7.5, y: 0, z: 7.5 };

  // Store original colors and positions
  const originalStates = allParts.map((part) => {
    const originalColor = { r: 0, g: 0, b: 0 };
    const originalY = part.position.y;

    // Try to get the color from the part's materials
    let colorFound = false;

    // Check direct material first
    if (part.material && !colorFound) {
      const material = Array.isArray(part.material)
        ? part.material[0]
        : part.material;
      if (material.color) {
        originalColor.r = material.color.r;
        originalColor.g = material.color.g;
        originalColor.b = material.color.b;
        colorFound = true;
      }
    }

    // If no direct material, traverse children to find materials
    if (!colorFound) {
      part.traverse((child) => {
        if (!colorFound && child.material) {
          const material = Array.isArray(child.material)
            ? child.material[0]
            : child.material;
          if (material.color) {
            originalColor.r = material.color.r;
            originalColor.g = material.color.g;
            originalColor.b = material.color.b;
            colorFound = true;
          }
        }
      });
    }

    // Fallback to DeepSkyBlue if no color found
    if (!colorFound) {
      originalColor.r = 0;
      originalColor.g = 0.7490196078431373;
      originalColor.b = 1;
    }

    return { part, originalColor, originalY };
  });

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;

    // Animate camera zoom out
    if (elapsed <= cameraAnimationDuration) {
      const cameraProgress = elapsed / cameraAnimationDuration;
      const easeOutProgress = 1 - Math.pow(1 - cameraProgress, 3); // Cubic ease-out for smooth camera movement
      
      // Interpolate camera position
      const currentCameraX = initialCameraPosition.x + (finalCameraPosition.x - initialCameraPosition.x) * easeOutProgress;
      const currentCameraY = initialCameraPosition.y + (finalCameraPosition.y - initialCameraPosition.y) * easeOutProgress;
      const currentCameraZ = initialCameraPosition.z + (finalCameraPosition.z - initialCameraPosition.z) * easeOutProgress;
      
      // Interpolate target position
      const currentTargetX = initialTargetPosition.x + (finalTargetPosition.x - initialTargetPosition.x) * easeOutProgress;
      const currentTargetY = initialTargetPosition.y + (finalTargetPosition.y - initialTargetPosition.y) * easeOutProgress;
      const currentTargetZ = initialTargetPosition.z + (finalTargetPosition.z - initialTargetPosition.z) * easeOutProgress;
      
      // Directly update camera and controls target
      camera.position.set(currentCameraX, currentCameraY, currentCameraZ);
      controls.target.set(currentTargetX, currentTargetY, currentTargetZ);
      controls.update(); // Update the controls to apply changes
    }

    originalStates.forEach((state, index) => {
      const { part, originalColor, originalY } = state;
      const staggerDelay = index * 150; // 150ms delay between segments
      const adjustedElapsed = elapsed - staggerDelay;

      if (adjustedElapsed > 0) {
        // Color animation
        if (adjustedElapsed <= colorDuration) {
          const colorProgress = adjustedElapsed / colorDuration;
          const currentR =
            originalColor.r + (brownColor.r - originalColor.r) * colorProgress;
          const currentG =
            originalColor.g + (brownColor.g - originalColor.g) * colorProgress;
          const currentB =
            originalColor.b + (brownColor.b - originalColor.b) * colorProgress;

          // Apply color to all materials in the part
          part.traverse((child) => {
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((material) => {
                  material.color.setRGB(currentR, currentG, currentB);
                });
              } else {
                child.material.color.setRGB(currentR, currentG, currentB);
              }
            }
          });
        }

        // Sinking animation (starts after delay)
        if (adjustedElapsed >= sinkDelay) {
          const sinkElapsed = adjustedElapsed - sinkDelay;
          if (sinkElapsed <= sinkDuration) {
            const sinkProgress = sinkElapsed / sinkDuration;
            const easeInProgress = sinkProgress * sinkProgress; // Quadratic ease-in
            part.position.y = originalY - 2 * easeInProgress; // Sink 2 units down
          }
        }
      }
    });

    // Continue animation or finish
    if (elapsed < animationDuration + originalStates.length * 150) {
      requestAnimationFrame(animate);
    } else if (onComplete) {
      onComplete();
    }
  }

  requestAnimationFrame(animate);
}

function handleGameOver(
  gameState,
  gameSettings,
  modal,
  highScore,
  highScoreBoard,
  controls,
  loop,
  stepTime,
  fruitMesh,
  snakeHeadMesh,
  snakeTailMeshArray,
  scene,
  specialFruitMesh
) {
  // Prevent multiple executions of game over logic
  if (gameState.gameOverHandled) {
    return;
  }

  gameState.gameOver = true;
  gameState.running = false;
  gameState.gameOverHandled = true; // Mark as handled

  // playSounds(src, mute)
  // where src in this case is defined as gameOver
  // and mute is a boolean, defined by gameSettings.audio
  playSounds(gameOver, gameSettings.audio);

  // Remove controls from updatables BEFORE starting animation so they don't interfere
  const controlsIndex = loop.updatables.indexOf(controls);
  if (controlsIndex !== -1) {
    loop.updatables.splice(controlsIndex, 1);
  }

  // Start the death animation, then show modal when complete
  animateSnakeDeath(snakeHeadMesh, snakeTailMeshArray, controls, () => {
    // Animation complete, show the appropriate modal
    if (gameState.score > highScore) {
      highScore = gameState.score;
      highScoreBoard.innerHTML = "High Score: " + gameState.score;
      setModal(gameState, modal, "highScore", "open");
    } else {
      setModal(gameState, modal, "gameOver", "open");
    }
  });

  loop.stepTime = 0.5;
  stepTime = 0.5;

  // Stop all snake movement by removing snake head and tail from updatables
  const snakeHeadIndex = loop.updatables.indexOf(snakeHeadMesh);
  if (snakeHeadIndex !== -1) {
    loop.updatables.splice(snakeHeadIndex, 1);
  }

  // Remove all tail segments from updatables to stop their animation
  snakeTailMeshArray.forEach((tailMesh) => {
    const tailIndex = loop.updatables.indexOf(tailMesh);
    if (tailIndex !== -1) {
      loop.updatables.splice(tailIndex, 1);
    }
  });

  // Remove special fruit from scene and updatables if it exists
  if (specialFruitMesh) {
    scene.remove(specialFruitMesh);
    const specialFruitIndex = loop.updatables.indexOf(specialFruitMesh);
    if (specialFruitIndex !== -1) {
      loop.updatables.splice(specialFruitIndex, 1);
    }
  }

  // Clear special fruit state
  gameState.specialFruit.active = false;
  gameState.specialFruit.position = null;
}
export { handleGameOver };
