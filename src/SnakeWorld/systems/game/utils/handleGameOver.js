import { setModal } from "./setModal";
import { playSounds } from "./playSounds";

const gameOver = require("../../../../assets/sounds/gameOver.mp3");

function handleGameOver(
  gameState,
  modal,
  highScore,
  highScoreBoard,
  controls,
  loop,
  stepTime
) {
  gameState.gameOver = true;
  gameState.running = false;

  // playSounds(src, mute)
  // where src in this case is defined as gameOver
  // and mute is a boolean, defined by gameState.audio
  // should be, will be, settings.audio
  const mute = gameState.audio;
  playSounds(gameOver, mute);

  if (gameState.score > highScore) {
    highScore = gameState.score;
    highScoreBoard.innerHTML = "High Score: " + gameState.score;
    setModal(gameState, modal, "highScore", "open");
  } else {
    setModal(gameState, modal, "gameOver", "open");
  }

  loop.stepTime = 0.5;
  stepTime = 0.5;

  if (controls.goTo) {
    controls.comeFrom = { ...controls.goTo };
  }

  // startPosition
  controls.goTo.cameraPosition = { x: 7.5, y: 32, z: 7.5 };
  controls.goTo.targetPosition = { x: 7.5, y: 0.7, z: 7.5 };

  loop.updatables.splice(loop.updatables.indexOf(controls), 1);
}
export { handleGameOver };
