import { setupMiniMap } from "./setupMiniMap";

const mute = require("../../../../assets/images/mute.svg");

const unMute = require("../../../../assets/images/unMute.svg");

const digitalDreamFont = require("../../../../assets/fonts/DIGITALDREAMFAT.ttf");

async function loadFonts() {
  const font = new FontFace("Digital Dream", `url(${digitalDreamFont})`);
  // wait for font to be loaded
  await font.load();
  // add font to document
  document.fonts.add(font);
}

// css helper function
function css(element, style) {
  for (const property in style) element.style[property] = style[property];
}

const gameInterfaceStyles = {
  position: "absolute",
  left: "10px",
  top: "10px",
  width: "400px",
  height: "220px",
  borderRadius: "10px",

  background: "rgba( 20, 20, 20, 0.6 )",
  boxShadow: "0 8px 32px 0 rgba( 38, 38, 38, 0.17 )",
  backdropFilter: "blur( 4px )",
  border: "1px solid rgba( 10, 10, 10, 0.18 )",
};

const miniMapStyles = {
  width: "200px",
  height: "200px",
  position: "absolute",
  top: "10px",
  left: "10px",
  borderRadius: "10px",
  boxShadow: "0 8px 32px 0 rgba( 38, 38, 38, 0.17 )",
};

const textStyles = {
  fontFamily: "Digital Dream",
  color: "#fff",
  position: "relative",
  left: "220px",
  textAlign: "left",
  textTransform: "uppercase",
};

const titleStyles = {
  fontSize: "22px",
};

const indicatorStyles = {
  fontSize: "20px",
  marginBottom: "10px",
};

const buttonBoxStyles = {
  position: "absolute",
  right: "10px",
  bottom: "10px",
  width: "140px",
  height: "60px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "10px",
};

const buttonStyles = {
  width: "100%",
  background: "rgba( 20, 20, 20, 0.3 )",
  boxShadow: "0 8px 32px 0 rgba( 38, 38, 38, 0.17 )",
  backdropFilter: "blur( 4px )",
  border: "1px solid rgba( 10, 10, 10, 0.18 )",
  color: "#Fff",
  fontSize: "30px",
  fontWeight: "bold",
  textDecoration: "none",
  borderRadius: "3px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const createInterface = () => {
  loadFonts();

  const gameInterface = document.createElement("div");
  css(gameInterface, gameInterfaceStyles);

  // title
  const title = document.createElement("h1");
  title.id = "title";
  css(title, textStyles);
  css(title, titleStyles);
  title.append("SnakenGame");

  // speedIndicator
  const speedIndicator = document.createElement("div");
  speedIndicator.id = "speedIndicator";
  css(speedIndicator, textStyles);
  css(speedIndicator, indicatorStyles);
  speedIndicator.append("Speed: 33");

  // scoreBoard
  const scoreBoard = document.createElement("div");
  scoreBoard.id = "scoreBoard";
  css(scoreBoard, textStyles);
  css(scoreBoard, indicatorStyles);
  scoreBoard.append("score: 33");

  // highScoreBoard, not currently in use
  const highScoreBoard = document.createElement("div");
  highScoreBoard.id = "highScoreBoard";

  // buttonholding button box
  const buttonBox = document.createElement("div");
  css(buttonBox, buttonBoxStyles);

  // gameExplanationButton
  const gameExplanationButton = document.createElement("button");
  gameExplanationButton.id = "gameExplanationButton";
  gameExplanationButton.append("?");
  css(gameExplanationButton, buttonStyles);

  gameExplanationButton.addEventListener("mouseenter", (e) => {
    gameExplanationButton.style.color = "red";
  });

  gameExplanationButton.addEventListener("mouseleave", (e) => {
    gameExplanationButton.style.color = "white";
  });

  buttonBox.append(gameExplanationButton);

  // muteButton

  const muteButton = document.createElement("button");
  muteButton.id = "muteButton";

  const muteImage = document.createElement("img");
  muteImage.src = mute;

  const unmuteImage = document.createElement("img");

  unmuteImage.src = unMute;

  muteButton.append(muteImage);
  muteImage.style.width = "30px";
  unmuteImage.style.width = "30px";
  css(muteButton, buttonStyles);

  muteButton.addEventListener("mouseenter", (e) => {
    muteButton.style.color = "red";
  });

  buttonBox.append(muteButton);

  // miniMap
  const miniMap = document.createElement("canvas");
  miniMap.id = "miniMap";
  miniMap.width = 200;
  miniMap.height = 200;
  css(miniMap, miniMapStyles);

  setupMiniMap(miniMap);

  // modal
  // const modal = document.createElement("div");
  // modal.id = "modal";
  // css(modal, modalStyles);

  gameInterface.append(
    title,
    speedIndicator,
    scoreBoard,
    buttonBox,
    miniMap
    // modal
  );

  return gameInterface;
};

export { createInterface };
