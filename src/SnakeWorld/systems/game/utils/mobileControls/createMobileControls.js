import "./mobileControls.css";

const createMobileControls = () => {
  const mobileControls = document.createElement("div");
  mobileControls.classList = "mobileControls";

  const left = document.createElement("div");
  left.classList = "left";

  const up = document.createElement("div");
  up.classList = "up";

  const down = document.createElement("div");
  down.classList = "down";

  const right = document.createElement("div");
  right.classList = "right";

  const bar = document.createElement("div");
  bar.classList = "bar";

  mobileControls.append(left);

  mobileControls.append(right);

  mobileControls.append(up);

  mobileControls.append(down);

  mobileControls.append(bar);

  return mobileControls;
};

export { createMobileControls };
