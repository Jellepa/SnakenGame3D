import { CameraHelper } from "three";

import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { createControls, createGameControls } from "./systems/controls.js";
import { Game } from "./systems/game/Game";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";

import { createAxesHelper, createGridHelper } from "./components/helpers.js";

import { Board } from "./components/Board/Board.js";
import { Train } from "./components/Train/Train.js";
import { Track } from "./components/Track/Track.js";
import { Pine } from "./components/Pine/Pine.js";
import { Station } from "./components/Station/Station.js";

import {
  createDirectionalLight,
  createHemisphereLight,
} from "./components/lights.js";
import { Ground } from "./components/Ground/Ground.js";
import { createInterface } from "./systems/game/utils/createInterface.js";
import { createModal } from "./systems/game/utils/createModal";

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let controls;
let gameControls;
let renderer;
let scene;
let loop;
let game;

class World {
  constructor(container, onTop) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);
    gameControls = createGameControls(camera, renderer.domElement);

    // bunch of html elements

    const gameInterface = createInterface();
    onTop.append(gameInterface);

    const modal = createModal();
    onTop.append(modal);

    // const gameExplanationButton = document.createElement("button");
    // gameExplanationButton.classList = "myButton explanationBtn";
    // gameExplanationButton.append("?");
    // onTop.append(gameExplanationButton);

    /* const gameExplanationModal = document.createElement("div");
    gameExplanationModal.classList = "open";
    onTop.append(gameExplanationModal); */

    /*     function toggleExplanationModal() {
      if (gameExplanationModal.classList.value === "open") {
        gameExplanationModal.classList = "closed";
      } else {
        gameExplanationModal.classList = "open";
      }
    } */

    //const muteButton = document.createElement("button");
    //muteButton.id = "muteButton";
    //muteButton.classList = "myButton soundButton";

    // const muteImage = document.createElement("img");
    // muteImage.src = mute;
    // const unmuteImage = document.createElement("img");
    // unmuteImage.src = unMute;

    // muteButton.append(muteImage);
    // onTop.append(muteButton);

    // Add later!!

    // const miniMap = document.createElement("canvas");
    // miniMap.className = "miniMap";
    // miniMap.width = 200;
    // miniMap.height = 200;
    // miniMap.style.position = "absolute";
    // miniMap.style.top = "10px";
    // miniMap.style.left = "10px";
    // onTop.append(miniMap);

    // const speedIndicator = document.createElement("div");
    // speedIndicator.className = "speedIndicator";
    //onTop.append(speedIndicator);

    // const scoreBoard = document.createElement("div");
    // scoreBoard.className = "scoreBoard";
    // onTop.append(scoreBoard);

    // const highScoreBoard = document.createElement("div");
    // highScoreBoard.id = "highScoreBoard";
    // onTop.append(highScoreBoard);

    // const modal = document.createElement("div");
    // modal.id = "modal";
    // modal.classList = "closed ";
    // onTop.append(modal);

    // lights

    const directionalLight = createDirectionalLight();

    const hemisphereLight = createHemisphereLight();

    // helpers

    const axesHelper = createAxesHelper();
    const gridHelper = createGridHelper();

    // meshes that are always there

    const ground = new Ground();

    const board = new Board();

    const train = new Train();
    train.position.set(3, 0, -2.5);

    const pine = new Pine();
    pine.position.set(-5, 0, 0);

    const pine2 = pine.clone();
    pine2.position.set(-5, 0, -3);

    const pine3 = pine.clone();
    pine3.position.set(-5, 0, 15);

    const pine4 = pine.clone();
    pine4.position.set(-5, 0, 18);

    const pine5 = pine.clone();
    pine5.position.set(-5, 0, 21);

    const pine6 = pine.clone();
    pine6.position.set(-5, 0, -6);

    const pine7 = pine.clone();
    pine7.position.set(16, 0, -8);

    const pine8 = pine.clone();
    pine8.position.set(16, 0, -5);

    const pine9 = pine.clone();
    pine9.position.set(16, 0, 1);

    const pine10 = pine.clone();
    pine10.position.set(16, 0, 4);

    const pine11 = pine.clone();
    pine11.position.set(16, 0, 7);

    const pine12 = pine.clone();
    pine12.position.set(16, 0, 10);

    const pine13 = pine.clone();
    pine13.position.set(16, 0, 13);

    const pine14 = pine.clone();
    pine14.position.set(16, 0, 18.5);

    /* const pine15 = pine.clone();
    pine15.position.set(16, 0, 18.5); */

    const pine16 = pine.clone();
    pine16.position.set(16, 0, 21.5);

    const pine17 = pine.clone();
    pine17.position.set(1, 0, 18.5);

    const pine18 = pine.clone();
    pine18.position.set(4, 0, 18.5);

    const pine19 = pine.clone();
    pine19.position.set(7, 0, 18.5);

    const pine20 = pine.clone();
    pine20.position.set(10, 0, 18.5);

    const pine21 = pine.clone();
    pine21.position.set(13, 0, 18.5);

    const pine22 = pine.clone();
    pine22.position.set(1, 0, -5);

    const pine23 = pine.clone();
    pine23.position.set(4, 0, -5);

    const pine24 = pine.clone();
    pine24.position.set(7, 0, -5);

    const pine25 = pine.clone();
    pine25.position.set(10, 0, -5);

    const pine26 = pine.clone();
    pine26.position.set(13, 0, -5);

    const track = new Track();
    track.position.set(1.5, 0, -8.5);

    const track2 = track.clone();
    track2.position.set(6.5, 0, -8.5);

    const track3 = track.clone();
    track3.position.set(11.5, 0, -8.5);

    const track4 = track.clone();
    track4.position.set(1.5, 0, 10);

    const track5 = track.clone();
    track5.position.set(6.5, 0, 10);

    const track6 = track.clone();
    track6.position.set(11.5, 0, 10);

    const track7 = track.clone();
    track7.rotateY(Math.PI / 2);
    track7.position.set(-8.5, 0, -5);

    const track8 = track.clone();
    track8.rotateY(Math.PI / 2);
    track8.position.set(-8.5, 0, 0);

    const track9 = track.clone();
    track9.rotateY(Math.PI / 2);
    track9.position.set(-8.5, 0, 5);

    const track10 = track.clone();
    track10.rotateY(Math.PI / 2);
    track10.position.set(-8.5, 0, 10);

    const track11 = track.clone();
    track11.rotateY(Math.PI / 2);
    track11.position.set(-8.5, 0, 15);

    const track12 = track.clone();
    track12.rotateY(Math.PI / 2);
    track12.position.set(-8.5, 0, 20);

    const track13 = track.clone();
    track13.position.set(16.5, 0, -8.5);

    const track14 = track.clone();
    track14.position.set(16.5, 0, 10);

    const station = new Station();
    station.rotateY(Math.PI / 2);
    station.position.set(-9, 0, 12);

    // the game

    game = new Game(
      scene,
      gameControls,
      loop,
      gameInterface
      /* scoreBoard,
      highScoreBoard,
      speedIndicator,
      modal,
      muteButton,
      gameExplanationButton,
      miniMap */
    );

    // loop.stepTime = game.gameSettings.stepTime;

    // loop.updatables.push(game, gameControls);

    loop.updatables.push(game, train);

    const cameraHelper = new CameraHelper(directionalLight.shadow.camera);

    scene.add(
      // axesHelper,
      // gridHelper,
      // cameraHelper,
      directionalLight,
      directionalLight.target,
      hemisphereLight,
      board,
      ground,
      train,
      track,
      track2,
      track3,
      track4,
      track5,
      track6,
      track7,
      track8,
      track9,
      track10,
      track11,
      track12,
      track13,
      track14,
      pine,
      pine2,
      pine3,
      pine4,
      pine5,
      pine6,
      pine7,
      pine8,
      pine9,
      pine10,
      pine11,
      pine12,
      pine13,
      pine14,
      // pine15,
      pine16,
      pine17,
      pine18,
      pine19,
      pine20,
      pine21,
      pine22,
      pine23,
      pine24,
      pine25,
      pine26,
      station
    );

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
