const setSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(container, camera, renderer) {
    // container overwrite
    // container = { clientWidth: 512, clientHeight: 512 };

    // set initial size on load
    setSize(container, camera, renderer);

    window.addEventListener("resize", () => {
      // set the size again if a resize occurs
      setSize(container, camera, renderer);
      // perform any custom actions
      // this.onResize();
    });
  }

  // callback hook, utilised in world.js to rerender on window change
  // .onResize is an empty method that we can customize from outside the Resizer class.
  // onResize() {}
}

export { Resizer };
