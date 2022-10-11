import { createGameState } from "./gameState";
import { createGameSettings } from "./gameSettings";
import { gameLoop } from "./gameLoop";

import { updateDirection } from "./utils/updateDirection";
import { removeMeshes } from "./utils/removeMeshes";
import { setModal } from "./utils/setModal";
import { setupMiniMap } from "./utils/setupMiniMap";
import { muteSounds, playMusic, unmuteSounds } from "./utils/playSounds";

import { Fruit } from "../../components/Fruit/Fruit.js";
import { SnakeHead } from "../../components/SnakeHead/SnakeHead.js";
import { SnakeBody } from "../../components/SnakeBody/SnakeBody.js";

import mute from "../../../assets/images/mute.svg";
import unmute from "../../../assets/images/unmute.svg";

const gameSound = require("./../../../assets/sounds/gameSound.mp3");

const muteImage = document.createElement("img");
muteImage.src = mute;

const unmuteImage = document.createElement("img");
unmuteImage.src = unmute;

// import gameControls !!!!

class Game {
  constructor(
    scene,
    controls,
    loop,
    gameInterface
    /* scoreBoard,
    highScoreBoard,
    speedIndicator,
    modal,
    soundBtn,
    gameExplanationButton,
    miniMap */
  ) {
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

    this.localElapsedTime = 0;

    this.scene = scene;
    this.controls = controls;

    this.loop = loop;

    // createEventListeners()

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

    document.addEventListener("keydown", (e) => {
      updateDirection(e, this.gameState);
    });

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
        gameLoop(
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
          this.miniMap
        );
      }
    }
  }

  start() {
    if (this.gameState.gameOver) {
      removeMeshes(
        this.scene,
        this.loop,
        this.fruitMesh,
        this.snakeHeadMesh,
        this.snakeTailMeshArray
      );
      this.gameState = createGameState();

      this.snakeTailMeshArray = [];
    }
    this.gameState.running = true;
    this.loop.start();
    this.loop.updatables.push(this.snakeHeadMesh);
    this.loop.updatables.push(this.fruitMesh);
    this.loop.updatables.push(this.controls);
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
    this.loop.updatables.splice(this.loop.updatables.indexOf(this.controls), 1);
    setModal(this.gameState, this.modal, "pause", "open");
  }
}

export { Game };
