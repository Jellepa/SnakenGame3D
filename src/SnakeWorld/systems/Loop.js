import { Clock } from "three";

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.elapsedTime = 0;
    this.stepTime = 0.5;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once at the very start of the frame!
    const delta = clock.getDelta();

    // console.log(`The last frame rendered in ${delta * 1000} milliseconds`);

    // just like the delta, these thing are there for multiple elements
    // , the game (gameLoop) however will update the loop.steptime / this.steptime to
    // gameSettings.steptime every Tick

    const elapsedTime = (this.elapsedTime += delta);

    const stepTime = this.stepTime;

    const stepPosition = this.elapsedTime % stepTime;

    for (const object of this.updatables) {
      object.tick(delta, elapsedTime, stepTime, stepPosition);
    }
  }
}

export { Loop };
