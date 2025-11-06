import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  controls.target.set(7.5, 0, 7.5);
  camera.position.set(7.5, 30, 7.5);

  controls.tick = () => controls.update();

  return controls;
}

function createGameControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  controls.target.set(7.5, 0, 7.5);
  camera.position.set(7.5, 30, 7.5);

  controls.tick = (delta, elapsedTime, stepTime, stepPosition) => {
    if (controls.goTo != null && controls.comeFrom != null) {
      let positionX =
        controls.comeFrom.targetPosition.x +
        ((controls.goTo.targetPosition.x - controls.comeFrom.targetPosition.x) /
          stepTime) *
          stepPosition;

      let positionY =
        controls.comeFrom.targetPosition.y +
        ((controls.goTo.targetPosition.y - controls.comeFrom.targetPosition.y) /
          stepTime) *
          stepPosition;

      let positionZ =
        controls.comeFrom.targetPosition.z +
        ((controls.goTo.targetPosition.z - controls.comeFrom.targetPosition.z) /
          stepTime) *
          stepPosition;

      controls.target.set(positionX, positionY, positionZ);

      if (Math.abs(controls.goTo.targetPosition.x - positionX) < 0.5) {
        controls.comeFrom.targetPosition.x = positionX;
      }
      if (Math.abs(controls.goTo.targetPosition.y - positionY) < 0.5) {
        controls.comeFrom.targetPosition.y = positionY;
      }
      if (Math.abs(controls.goTo.targetPosition.z - positionZ) < 0.5) {
        controls.comeFrom.targetPosition.z = positionZ;
      }

      let camPositionX =
        controls.comeFrom.cameraPosition.x +
        ((controls.goTo.cameraPosition.x - controls.comeFrom.cameraPosition.x) /
          stepTime) *
          stepPosition;

      let camPositionY = 8;
      /* controls.comeFrom.cameraPosition.y +
        ((controls.goTo.cameraPosition.y - controls.comeFrom.cameraPosition.y) /
          stepTime) *
          stepPosition; */

      let camPositionZ =
        controls.comeFrom.cameraPosition.z +
        ((controls.goTo.cameraPosition.z - controls.comeFrom.cameraPosition.z) /
          stepTime) *
          stepPosition;

      camera.position.set(camPositionX, camPositionY, camPositionZ);

      //    controls.comeFrom.cameraPosition.x = camPositionX;
      //    controls.comeFrom.cameraPosition.y = camPositionY;
      //    controls.comeFrom.cameraPosition.z = camPositionZ;

      if (Math.abs(controls.goTo.cameraPosition.x - camPositionX) < 0.5) {
        controls.comeFrom.cameraPosition.x = camPositionX;
      }
      if (Math.abs(controls.goTo.cameraPosition.y - camPositionY) < 0.5) {
        controls.comeFrom.cameraPosition.y = camPositionY;
      }
      if (Math.abs(controls.goTo.cameraPosition.z - camPositionZ) < 0.5) {
        controls.comeFrom.cameraPosition.z = camPositionZ;
      }
    }

    controls.update();
  };

  return controls;
}

export { createControls, createGameControls };
