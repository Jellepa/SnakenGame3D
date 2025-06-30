import { createGameState } from "./gameState";
import { createGameSettings } from "./gameSettings";
import { gameLoop } from "./gameLoop";

import { updateDirection } from "./utils/updateDirection";
import { updateDirectionSafe } from "./utils/updateDirectionSafe";
import { removeMeshes } from "./utils/removeMeshes";
import { setModal } from "./utils/setModal";
import { setupMiniMap } from "./utils/setupMiniMap";
import { muteSounds, playMusic, unmuteSounds } from "./utils/playSounds";

import { Fruit } from "../../components/Fruit/Fruit.js";
import { SpecialFruit } from "../../components/SpecialFruit/SpecialFruit.js";
import { SnakeHead } from "../../components/SnakeHead/SnakeHead.js";
import { SnakeBody } from "../../components/SnakeBody/SnakeBody.js";

import mute from "../../../assets/images/mute.svg";
import unmute from "../../../assets/images/unmute.svg";
import { createMobileControls } from "./utils/mobileControls/createMobileControls";

const gameSound = require("./../../../assets/sounds/gameSound.mp3");

const muteImage = document.createElement("img");
muteImage.src = mute;

const unmuteImage = document.createElement("img");
unmuteImage.src = unmute;

// import gameControls !!!!

class Game {
  constructor(scene, controls, loop, gameInterface) {
    this.gameState = createGameState();

    this.gameSettings = createGameSettings();

    // html elements

    // console.log(gameInterface);

    this.scoreBoard = document.getElementById("scoreBoard");

    this.highScoreBoard = document.getElementById("highScoreBoard");

    this.speedIndicator = document.getElementById("speedIndicator");

    this.soundBtn = document.getElementById("muteButton");

    this.gameExplanationButton = document.getElementById(
      "gameExplanationButton"
    );

    this.miniMap = document.getElementById("miniMap");

    this.modal = document.getElementById("modal");

    this.snakeHeadMesh = new SnakeHead();

    this.snakeTailMesh = new SnakeBody();
    this.snakeTailMeshArray = [];

    this.fruitMesh = new Fruit();
    this.specialFruitMesh = null; // Created dynamically when needed

    this.localElapsedTime = 0;

    this.scene = scene;
    this.controls = controls;

    this.loop = loop;

    // createEventListeners()

    const mobileControls = createMobileControls();

    const onTop = document.getElementById("onTop");

    onTop.append(mobileControls);

    // event listener for mobile controls
    document.addEventListener("touchstart", (e) => {
      console.log(e.target.classList.value);
      if (e.target.classList.value === "bar") {
        if (this.gameState.running === false) {
          this.start();
        } else {
          this.pause();
        }
      }
      if (e.target.classList.value === "up") {
        if (this.gameSettings.stepTime > 0.2) {
          this.gameSettings.stepTime -= 0.1;
          this.gameSettings.speed += 10;
          this.speedIndicator.innerHTML = "Speed: " + this.gameSettings.speed;
        }
      }
      if (e.target.classList.value === "down") {
        if (this.gameSettings.stepTime < 0.5) {
          this.gameSettings.stepTime += 0.1;
          this.gameSettings.speed -= 10;
          this.speedIndicator.innerHTML = "Speed: " + this.gameSettings.speed;
        }
      }
      if (
        e.target.classList.value === "left" ||
        e.target.classList.value === "right"
      ) {
        updateDirectionSafe(
          e,
          this.gameState,
          this.gameSettings,
          performance.now()
        );
      }
    });

    this.soundBtn.addEventListener("click", () => {
      this.gameState.audio = !this.gameState.audio;
      if (this.gameState.audio) {
        soundBtn.innerHTML = "";
        soundBtn.append(muteImage);
        unmuteSounds();
      } else {
        soundBtn.innerHTML = "";
        soundBtn.append(unmuteImage);
        muteSounds();
      }
    });

    let open = true;

    this.gameExplanationButton.addEventListener("click", () => {
      open = !open;
      if (open) {
        setModal(this.gameState, this.modal, "explanation", "closed");
      } else {
        setModal(this.gameState, this.modal, "explanation", "open");
      }
    });
    // Event listener for keyboard controls
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        if (this.gameState.running === false) {
          this.start();
        } else {
          this.pause();
        }
      }
      if (e.key === "ArrowUp" || e.code === "KeyW") {
        if (this.gameSettings.stepTime > 0.2) {
          this.gameSettings.stepTime -= 0.1;
          this.gameSettings.speed += 10;
          this.speedIndicator.innerHTML = "Speed: " + this.gameSettings.speed;
        }
      }
      if (e.key === "ArrowDown" || e.code === "KeyS") {
        if (this.gameSettings.stepTime < 0.5) {
          this.gameSettings.stepTime += 0.1;
          this.gameSettings.speed -= 10;
          this.speedIndicator.innerHTML = "Speed: " + this.gameSettings.speed;
        }
      }
      updateDirectionSafe(
        e,
        this.gameState,
        this.gameSettings,
        performance.now()
      );
    });
  }

  // Will fire the gameLoop at stepTime, and then reset locallyElapsedTime
  tick(delta, elapsedTime, stepTime, stepPosition) {
    // needed for stepbased gamePlay
    this.localElapsedTime += delta;

    // indicator to go too the next step
    if (this.localElapsedTime > this.gameSettings.stepTime) {
      if (this.gameState.running) {
        // almost set back to zero
        this.localElapsedTime = elapsedTime % this.gameSettings.stepTime;

        // update the loop to most recent  stepTime
        this.loop.stepTime = this.gameSettings.stepTime;

        // Async GameLoop
        // Handle special fruit cleanup
        if (!this.gameState.specialFruit.active && this.specialFruitMesh) {
          this.scene.remove(this.specialFruitMesh);
          const specialFruitIndex = this.loop.updatables.indexOf(
            this.specialFruitMesh
          );
          if (specialFruitIndex !== -1) {
            this.loop.updatables.splice(specialFruitIndex, 1);
          }
          this.specialFruitMesh = null;
        }

        // Handle special fruit spawning
        if (this.gameState.specialFruit.active && !this.specialFruitMesh) {
          console.log("Creating special fruit mesh..."); // Debug log
          this.specialFruitMesh = new SpecialFruit();
          this.scene.add(this.specialFruitMesh);
          this.loop.updatables.push(this.specialFruitMesh);
          this.specialFruitMesh.position.set(
            1.5 * this.gameState.specialFruit.position.x,
            0.7,
            1.5 * this.gameState.specialFruit.position.z
          );
          console.log(
            "Special fruit added to scene at position:",
            this.specialFruitMesh.position
          ); // Debug log
        }

        const gameLoopResult = gameLoop(
          this.gameState,
          this.gameSettings,
          this.scoreBoard,
          this.modal,
          this.highScore,
          this.highScoreBoard,
          this.controls,
          this.loop,
          this.fruitMesh,
          this.snakeHeadMesh,
          this.snakeTailMesh,
          this.snakeTailMeshArray,
          this.scene,
          this.miniMap,
          this.specialFruitMesh
        );

        // Handle special fruit removal from game loop
        if (gameLoopResult && gameLoopResult.specialFruitRemoved) {
          this.specialFruitMesh = null;
        }
      }
    }
  }

  start() {
    if (this.gameState.gameOver) {
      // Use regular removal without animation
      removeMeshes(
        this.scene,
        this.loop,
        this.fruitMesh,
        this.snakeHeadMesh,
        this.snakeTailMeshArray
      );

      // Reset game state immediately
      this.gameState = createGameState();
      this.snakeTailMeshArray = [];
      this.specialFruitMesh = null; // Reset special fruit mesh

      // Reset all original meshes to their default state after cleanup
      this.resetMeshesToDefault();
    }

    // Start the game
    this.gameState.running = true;
    this.loop.start();
    this.addUpdatablesToLoop();
  }

  addUpdatablesToLoop() {
    // Add animated objects to the loop (check to avoid duplicates)
    if (!this.loop.updatables.includes(this.snakeHeadMesh)) {
      this.loop.updatables.push(this.snakeHeadMesh);
    }
    if (!this.loop.updatables.includes(this.fruitMesh)) {
      this.loop.updatables.push(this.fruitMesh);
    }
    if (!this.loop.updatables.includes(this.controls)) {
      this.loop.updatables.push(this.controls);
    }

    // Add any existing tail segments back to updatables
    this.snakeTailMeshArray.forEach((tailMesh) => {
      if (!this.loop.updatables.includes(tailMesh)) {
        this.loop.updatables.push(tailMesh);
      }
    });

    // Re-add special fruit to updatables if it exists
    if (
      this.specialFruitMesh &&
      !this.loop.updatables.includes(this.specialFruitMesh)
    ) {
      this.loop.updatables.push(this.specialFruitMesh);
    }

    this.scene.add(this.fruitMesh, this.snakeHeadMesh);

    this.scoreBoard.innerHTML = "Score: " + this.gameState.score;
    this.speedIndicator.innerHTML = "Speed: " + this.gameSettings.speed;
    // this.modal.classList = "closed";
    setModal(this.gameState, this.modal, "pause", "closed");
    playMusic(gameSound, this.gameSettings.audio);
    setupMiniMap(this.miniMap);
  }

  pause() {
    this.gameState.running = false;

    // Remove animated objects from the loop to stop their animations
    const controlsIndex = this.loop.updatables.indexOf(this.controls);
    if (controlsIndex !== -1) {
      this.loop.updatables.splice(controlsIndex, 1);
    }

    const snakeHeadIndex = this.loop.updatables.indexOf(this.snakeHeadMesh);
    if (snakeHeadIndex !== -1) {
      this.loop.updatables.splice(snakeHeadIndex, 1);
    }

    const fruitIndex = this.loop.updatables.indexOf(this.fruitMesh);
    if (fruitIndex !== -1) {
      this.loop.updatables.splice(fruitIndex, 1);
    }

    // Remove special fruit from updatables if it exists
    if (this.specialFruitMesh) {
      const specialFruitIndex = this.loop.updatables.indexOf(
        this.specialFruitMesh
      );
      if (specialFruitIndex !== -1) {
        this.loop.updatables.splice(specialFruitIndex, 1);
      }
    }

    // Remove all snake tail segments from updatables
    this.snakeTailMeshArray.forEach((tailMesh) => {
      const tailIndex = this.loop.updatables.indexOf(tailMesh);
      if (tailIndex !== -1) {
        this.loop.updatables.splice(tailIndex, 1);
      }
    });

    setModal(this.gameState, this.modal, "pause", "open");
  }

  // Animation helper methods
  // Reset all meshes to their default state
  resetMeshesToDefault() {
    // Reset fruit mesh
    if (this.fruitMesh) {
      this.fruitMesh.scale.set(1, 1, 1);
      this.fruitMesh.rotation.set(0, 0, 0);
      this.fruitMesh.visible = true; // Ensure visibility is restored
      this.resetMeshMaterials(this.fruitMesh);
    }

    // Reset snake head mesh
    if (this.snakeHeadMesh) {
      this.snakeHeadMesh.scale.set(1, 1, 1);
      this.snakeHeadMesh.rotation.set(0, 0, 0);
      this.snakeHeadMesh.visible = true; // Ensure visibility is restored
      this.resetMeshMaterials(this.snakeHeadMesh);
    }

    // Reset special fruit mesh
    if (this.specialFruitMesh) {
      this.specialFruitMesh.scale.set(1, 1, 1);
      this.specialFruitMesh.rotation.set(0, 0, 0);
      this.specialFruitMesh.visible = true; // Ensure visibility is restored
      this.resetMeshMaterials(this.specialFruitMesh);
    }

    // Reset all snake tail meshes
    this.snakeTailMeshArray.forEach((tailMesh) => {
      if (tailMesh) {
        tailMesh.scale.set(1, 1, 1);
        tailMesh.rotation.set(0, 0, 0);
        tailMesh.visible = true; // Ensure visibility is restored
        this.resetMeshMaterials(tailMesh);
      }
    });
  }

  // Helper method to reset material properties
  resetMeshMaterials(mesh) {
    if (mesh) {
      mesh.traverse((child) => {
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              material.transparent = false;
              material.opacity = 1.0;
            });
          } else {
            child.material.transparent = false;
            child.material.opacity = 1.0;
          }
        }
      });
    }
  }

  // Batch animate snake tail removal
  animateRemoveSnakeTail(onComplete) {
    if (this.snakeTailMeshArray.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    let completedAnimations = 0;
    const totalAnimations = this.snakeTailMeshArray.length;

    this.snakeTailMeshArray.forEach((tailMesh, index) => {
      // Stagger the animations slightly for a wave effect
      setTimeout(() => {
        this.animateRemoveSnakeBody(tailMesh, () => {
          completedAnimations++;
          if (completedAnimations === totalAnimations) {
            this.snakeTailMeshArray = [];
            if (onComplete) onComplete();
          }
        });
      }, index * 100); // 100ms delay between each tail segment
    });
  }
}

export { Game };
