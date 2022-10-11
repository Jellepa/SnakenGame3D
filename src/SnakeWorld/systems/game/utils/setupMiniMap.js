const setupMiniMap = (miniMap) => {
  const miniMapContext = miniMap.getContext("2d");

  // background

  miniMap.style.background = "rgba(20,20,20,0.6)";

  // arena
  miniMapContext.fillStyle = "#bbbbbb";
  miniMapContext.clearRect(50, 50, 100, 100);
  miniMapContext.fillRect(53, 53, 94, 94);

  // color for the trees
  miniMapContext.fillStyle = "#014a01";

  // gradient testing

  const grd = miniMapContext.createRadialGradient(50, 20, 0, 50, 50, 200);
  grd.addColorStop(0, "#028900");
  grd.addColorStop(1, "#003900");
  // Fill with gradient
  miniMapContext.fillStyle = grd;

  // three line in the north
  miniMapContext.beginPath();
  miniMapContext.arc(60, 20, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(80, 20, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(100, 20, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(120, 20, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(140, 20, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(160, 20, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  // three line in the south
  miniMapContext.beginPath();
  miniMapContext.arc(60, 180, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(80, 180, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(100, 180, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(120, 180, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(140, 180, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(160, 180, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  // three line in the east
  // most northern
  miniMapContext.beginPath();
  miniMapContext.arc(160, 0, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  // most southern
  miniMapContext.beginPath();
  miniMapContext.arc(160, 200, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(160, 60, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(160, 80, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(160, 100, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(160, 120, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(160, 140, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  // three line in the west
  miniMapContext.beginPath();
  miniMapContext.arc(20, 50, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(20, 30, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(20, 10, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(20, 150, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(20, 170, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  miniMapContext.beginPath();
  miniMapContext.arc(20, 190, 7, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  // the tracks
  miniMapContext.lineWidth = 2;

  //inside of tracks
  const lengthOfTrack = 40;
  miniMapContext.strokeStyle = "#78bd88";
  for (let i = 0; i < lengthOfTrack; i++) {
    miniMapContext.beginPath();
    miniMapContext.moveTo(52 + i * 5, 32); // Move pen to bottom-left corner
    miniMapContext.lineTo(52 + i * 5, 48); // Line to top corner
    miniMapContext.closePath(); // Line to bottom-left corner
    miniMapContext.stroke();
  }

  for (let i = 0; i < lengthOfTrack; i++) {
    miniMapContext.beginPath();
    miniMapContext.moveTo(52 + i * 5, 152); // Move pen to bottom-left corner
    miniMapContext.lineTo(52 + i * 5, 168); // Line to top corner
    miniMapContext.closePath(); // Line to bottom-left corner
    miniMapContext.stroke();
  }

  for (let i = 0; i < lengthOfTrack; i++) {
    miniMapContext.beginPath();
    miniMapContext.moveTo(32, i * 5); // Move pen to bottom-left corner
    miniMapContext.lineTo(48, i * 5); // Line to top corner
    miniMapContext.closePath(); // Line to bottom-left corner
    miniMapContext.stroke();
  }

  miniMapContext.strokeStyle = "#1a5250";

  // north tracks
  miniMapContext.beginPath();
  miniMapContext.moveTo(50, 35); // Move pen to bottom-left corner
  miniMapContext.lineTo(200, 35); // Line to top corner
  miniMapContext.closePath(); // Line to bottom-left corner
  miniMapContext.stroke();

  miniMapContext.beginPath();
  miniMapContext.moveTo(50, 45); // Move pen to bottom-left corner
  miniMapContext.lineTo(200, 45); // Line to top corner
  miniMapContext.closePath(); // Line to bottom-left corner
  miniMapContext.stroke();

  // south tracks
  miniMapContext.beginPath();
  miniMapContext.moveTo(50, 155); // Move pen to bottom-left corner
  miniMapContext.lineTo(200, 155); // Line to top corner
  miniMapContext.closePath(); // Line to bottom-left corner
  miniMapContext.stroke();

  miniMapContext.beginPath();
  miniMapContext.moveTo(50, 165); // Move pen to bottom-left corner
  miniMapContext.lineTo(200, 165); // Line to top corner
  miniMapContext.closePath(); // Line to bottom-left corner
  miniMapContext.stroke();

  // west tracks
  miniMapContext.beginPath();
  miniMapContext.moveTo(35, 0); // Move pen to bottom-left corner
  miniMapContext.lineTo(35, 200); // Line to top corner
  miniMapContext.closePath(); // Line to bottom-left corner
  miniMapContext.stroke();

  miniMapContext.beginPath();
  miniMapContext.moveTo(45, 0); // Move pen to bottom-left corner
  miniMapContext.lineTo(45, 200); // Line to top corner
  miniMapContext.closePath(); // Line to bottom-left corner
  miniMapContext.stroke();

  // train
  // -- wheels
  miniMapContext.fillStyle = "#5a7a4f";
  miniMapContext.fillRect(60, 32, 5, 16);
  miniMapContext.fillRect(70, 32, 5, 16);
  miniMapContext.fillRect(80, 32, 8, 16);

  // -- body
  miniMapContext.fillStyle = "#5d201a";
  miniMapContext.fillRect(60, 34, 30, 12);

  // -- roof
  miniMapContext.fillStyle = "#872c25";
  miniMapContext.fillRect(80, 34, 10, 12);

  // -- chimney
  miniMapContext.fillStyle = "#5a7a4f";
  miniMapContext.beginPath();
  miniMapContext.arc(65, 40, 3, 0, 2 * Math.PI, false);
  miniMapContext.fill();
  miniMapContext.closePath();

  // station
  miniMapContext.fillStyle = "#78bd88";
  miniMapContext.fillRect(0, 75, 22, 57);

  miniMapContext.fillStyle = "#27612a";
  miniMapContext.fillRect(0, 75, 20, 60);
  miniMapContext.fillRect(0, 75, 25, 20);

  miniMapContext.fillStyle = "#2a8d2f";
  miniMapContext.beginPath();
  miniMapContext.moveTo(0, 75);
  miniMapContext.lineTo(25, 95);
  miniMapContext.lineTo(20, 95);
  miniMapContext.lineTo(20, 135);
  miniMapContext.lineTo(0, 135);
  miniMapContext.closePath();
  miniMapContext.fill();

  // outer border
  /* miniMapContext.lineWidth = 10;
  miniMapContext.strokeStyle = "#000";
  miniMapContext.strokeRect(0, 0, 200, 200); */
};
export { setupMiniMap };
