import { setupMiniMap } from "../setupMiniMap";
import "./interface.css";

const mute = require("../../../../../assets/images/mute.svg");

const unmute = require("../../../../../assets/images/unmute.svg");

// const digitalDreamFont = require("../../../../../assets/fonts/DIGITALDREAMFAT.ttf");
const roboto = require("../../../../../assets/fonts/Roboto-Regular.ttf");

/* async function loadFonts() {
  const font = new FontFace("Digital Dream", `url(${digitalDreamFont})`);
  // wait for font to be loaded
  await font.load();
  // add font to document
  document.fonts.add(font);
} */
async function loadFonts() {
  const font = new FontFace("Roboto", `url(${roboto})`);
  // wait for font to be loaded
  await font.load();
  // add font to document
  document.fonts.add(font);
}

const createInterface = () => {
  loadFonts();

  const gameInterface = document.createElement("div");
  gameInterface.id = "gameInterface";
  // gameInterface.style.fontFamily = "Digital Dream";
  gameInterface.style.fontFamily = "Roboto";

  // miniMap
  const miniMap = document.createElement("canvas");
  miniMap.id = "miniMap";
  miniMap.width = 200;
  miniMap.height = 200;

  setupMiniMap(miniMap);

  // container for all text elements on the right
  const textBox = document.createElement("div");
  textBox.id = "textBox";

  // title
  const title = document.createElement("h1");
  title.id = "title";
  title.append("SnakenGame");

  // speedIndicator
  const speedIndicator = document.createElement("div");
  speedIndicator.id = "speedIndicator";
  speedIndicator.classList = "textStyles, indicatorStyles";
  speedIndicator.append("Speed: 33");

  // scoreBoard
  const scoreBoard = document.createElement("div");
  scoreBoard.id = "scoreBoard";
  scoreBoard.classList = "textStyles, indicatorStyles";
  scoreBoard.append("score: 33");

  // highScoreBoard, not currently in use
  const highScoreBoard = document.createElement("div");
  highScoreBoard.id = "highScoreBoard";

  // buttonholding button box
  const buttonBox = document.createElement("div");
  buttonBox.classList = "buttonBoxStyles";

  // gameExplanationButton
  const gameExplanationButton = document.createElement("button");
  gameExplanationButton.id = "gameExplanationButton";
  gameExplanationButton.classList = "buttonStyles";
  gameExplanationButton.append("?");

  // muteButton

  const muteButton = document.createElement("button");
  muteButton.id = "muteButton";
  muteButton.classList = "buttonStyles";

  const muteImage = document.createElement("img");
  muteImage.src = mute;

  const unmuteImage = document.createElement("img");

  unmuteImage.src = unmute;

  // Since audio is disabled by default, show unmute icon
  muteButton.append(unmuteImage);
  muteImage.style.width = "20px";
  unmuteImage.style.width = "20px";

  muteButton.addEventListener("mouseenter", (e) => {
    muteButton.style.color = "red";
  });

  buttonBox.append(gameExplanationButton, muteButton);

  textBox.append(title, speedIndicator, scoreBoard, buttonBox);

  gameInterface.append(miniMap, textBox);

  return gameInterface;
};

export { createInterface };
