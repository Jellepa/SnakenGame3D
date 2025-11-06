function setModal(gameState, modal, option, cssClass) {
  switch (option) {
    case "explanation":
    case "pause":
      // Merged pause and explanation screens
      const isPaused = option === "pause";
      modal.innerHTML =
        (isPaused ? "<h1>GAME PAUSED</h1>" : "<h1>3D SNAKE GAME</h1>") +
        "<div style='display: flex; flex-direction: column; align-items: center; gap: 25px; max-width: 700px; margin: 0 auto; width: 100%; box-sizing: border-box;'>" +
        // Game explanation section
        "<div style='text-align: left; width: 100%;'>" +
        "<h2>How to Play</h2>" +
        "<p>The goal is to grow your snake as long as possible by eating fruits!</p>" +
        "<p>🍎 <strong>Normal Fruit:</strong> Worth 5 points</p>" +
        "<p>🟣 <strong>Purple Special Fruit:</strong> Worth 25 points, appears rarely for 12 seconds</p>" +
        "<p>This 3D snake game uses third-person camera controls.</p>" +
        "</div>" +
        // Controls section
        /* "<div style='text-align: left; width: 100%;'>" +
        "<h3>Controls</h3>" +
        "<div style='display: flex; flex-direction: row; align-items: left; gap: 20px; width: 100%;'>" +
        // Keyboard controls
        "<div style='text-align: left;'>" +
        "<h4>Keyboard</h4>" +
        "<div class='controlGrid'>" +
        "<div class='control W'>W</div>" +
        "<div class='control A'>A</div>" +
        "<div class='control S'>S</div>" +
        "<div class='control D'>D</div>" +
        "</div>" +
        "<p style='margin: 10px 0;'>or</p>" +
        "<div class='controlGrid'>" +
        "<div class='control'><span>&#9651;</span></div>" +
        "<div class='control'><span>&#9665;</span></div>" +
        "<div class='control'><span>&#9661;</span></div>" +
        "<div class='control'><span>&#9655;</span></div>" +
        "</div>" +
        "</div>" +
        // Movement explanation
        "<div style='text-align: left; max-width: 400px;'>" +
        "<h4>Movement</h4>" +
        "<p><strong>Turn Left:</strong> A or ←</p>" +
        "<p><strong>Turn Right:</strong> D or →</p>" +
        "<p><strong>Speed Up:</strong> W or ↑</p>" +
        "<p><strong>Slow Down:</strong> S or ↓</p>" +
        "</div>" +
        "</div>" + // Close controls flex container
        "</div>" + // Close controls section */
        // Instructions
        "<div style='text-align: left; margin-top: 20px; margin-bottom: 40px; width: 100%;'>" +
        "<p style='font-size: 18px; font-weight: bold;'>Press <span class='space'>SPACE</span> to " +
        (isPaused ? "continue" : "start the game") +
        "</p>" +
        "</div>" +
        "</div>"; // Close main container
      break;
    case "highScore":
      modal.innerHTML =
        "<h1>GAME OVER</h1>" +
        "<div style='display: flex; flex-direction: column; align-items: center; gap: 25px; max-width: 700px; margin: 0 auto; width: 100%; box-sizing: border-box;'>" +
        "<div style='text-align: center; width: 100%;'>" +
        "<h2>New High Score!</h2>" +
        "<p style='font-size: 20px; margin-bottom: 20px;'>You scored " +
        gameState.score +
        " points</p>" +
        "<p style='font-size: 18px; font-weight: bold;'>Press <span class='space'>SPACE</span> to try again!</p>" +
        "</div>" +
        "</div>";
      break;
    case "gameOver":
      modal.innerHTML =
        "<h1>GAME OVER</h1>" +
        "<div style='display: flex; flex-direction: column; align-items: center; gap: 25px; max-width: 700px; margin: 0 auto; width: 100%; box-sizing: border-box;'>" +
        "<div style='text-align: center; width: 100%;'>" +
        "<p style='font-size: 20px; margin-bottom: 20px;'>You scored " +
        gameState.score +
        " points</p>" +
        "<p style='font-size: 18px; font-weight: bold;'>Press <span class='space'>SPACE</span> to try again!</p>" +
        "</div>" +
        "</div>";
      break;
    default:
      modal.innerHTML = "<h1>YEEEH SNAKENGAME</h1>";
  }

  if (cssClass === "open") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}

export { setModal };
