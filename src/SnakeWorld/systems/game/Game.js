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

    const mobileControls = document.createElement("div");
    mobileControls.classList = "mobileControls";
    mobileControls.style.position = "absolute";
    mobileControls.style.bottom = "0";
    mobileControls.style.zIndex = "1000";
    mobileControls.style.width = "calc(100% - 20px)";
    mobileControls.style.padding = "10px";
    mobileControls.style.display = "grid";
    mobileControls.style.gap = "10px";
    mobileControls.style.gridTemplateColumns = "repeat(3, 1fr)";
    mobileControls.style.gridAutoRows = "minmax(100px, auto)";

    const left = document.createElement("div");
    left.classList = "left";
    left.style.borderRadius = "10px";
    left.style.background = "rgba( 20, 20, 20, 0.6 )";
    left.style.boxShadow = "0 8px 32px 0 rgba( 38, 38, 38, 0.17 )";
    left.style.backdropFilter = "blur( 4px )";
    left.style.border = "1px solid rgba( 10, 10, 10, 0.18 )";
    left.style.gridColumn = "1/2";
    left.style.gridRow = "1/3";

    const up = document.createElement("div");
    up.classList = "up";
    up.style.borderRadius = "10px";
    up.style.background = "rgba( 20, 20, 20, 0.6 )";
    up.style.boxShadow = "0 8px 32px 0 rgba( 38, 38, 38, 0.17 )";
    up.style.backdropFilter = "blur( 4px )";
    up.style.border = "1px solid rgba( 10, 10, 10, 0.18 )";
    up.style.gridColumn = "2/3";
    up.style.gridRow = "1/2";

    const down = document.createElement("div");
    down.classList = "down";
    down.style.borderRadius = "10px";
    down.style.background = "rgba( 20, 20, 20, 0.6 )";
    down.style.boxShadow = "0 8px 32px 0 rgba( 38, 38, 38, 0.17 )";
    down.style.backdropFilter = "blur( 4px )";
    down.style.border = "1px solid rgba( 10, 10, 10, 0.18 )";
    down.style.gridColumn = "2/3";
    down.style.gridRow = "2/3";

    const right = document.createElement("div");
    right.classList = "right";
    right.style.borderRadius = "10px";
    right.style.background = "rgba( 20, 20, 20, 0.6 )";
    right.style.boxShadow = "0 8px 32px 0 rgba( 38, 38, 38, 0.17 )";
    right.style.backdropFilter = "blur( 4px )";
    right.style.border = "1px solid rgba( 10, 10, 10, 0.18 )";
    right.style.gridColumn = "3/4";
    right.style.gridRow = "1/3";

    const bar = document.createElement("div");
    bar.classList = "bar";
    bar.style.borderRadius = "10px";
    bar.style.background = "rgba( 20, 20, 20, 0.6 )";
    bar.style.boxShadow = "0 8px 32px 0 rgba( 38, 38, 38, 0.17 )";
    bar.style.backdropFilter = "blur( 4px )";
    bar.style.border = "1px solid rgba( 10, 10, 10, 0.18 )";
    bar.style.gridColumn = "1/4";
    bar.style.gridRow = "3/4";

    mobileControls.append(left);

    mobileControls.append(right);

    mobileControls.append(up);

    mobileControls.append(down);

    mobileControls.append(bar);

    const onTop = document.getElementById("onTop");

    onTop.append(mobileControls);

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
      if (e.target.classList.value === "left" || "right") {
        updateDirection(e, this.gameState);
      }
    });

    /*  document.addEventListener("touchstart", () => {
      console.log("start");
      if (this.gameState.running === false) {
        this.start();
      } else {
        this.pause();
      }
    });

    document.addEventListener("touchmove", () => {
      console.log("move");
    });

    document.addEventListener("touchend", () => {
      console.log("end");
    }); */

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
