function setModal(gameState, modal, option, cssClass) {
  switch (option) {
    case "explanation":
      modal.innerHTML =
        "<h2>Game Explanation and Controls</h2>" +
        "<p>The goal of this game is to grow your snake as long as possible.</p>" +
        "<p> To grow the snake you have to eat the fruit that will be availeble on the board. </p>" +
        "<p> Other than a normal snake game, this 3D variety uses a thrid person camera and controls </p>" +
        "<p>To move the snake around use</p>" +
        "<div class='controlGrid'>" +
        "<div class='control W'>W</div>" +
        "<div class='control A'>A</div>" +
        "<div class='control S'>S</div>" +
        "<div class='control D'>D</div>" +
        "</div>" +
        "<p>or use these</p>" +
        "<div class='controlGrid'>" +
        "<div class='control W'><span>&#9651;</span></div>" +
        "<div class='control A'><span>&#9665;</span></div>" +
        "<div class='control S'><span>&#9661;</span></div>" +
        "<div class='control D'><span>&#9655;</span></div>" +
        "</div>" +
        "<p>in the following manner</p>" +
        "<p class='inline'>To turn left press</p>" +
        "<div class='control inline'>A</div>" +
        "<p class='inline'>or</p>" +
        "<div class='control inline'><span>&#9665;</span></div>" +
        "<br />" +
        "<p class='inline'>To turn left press</p>" +
        "<div class='control inline'>D</div>" +
        "<p class='inline'>or</p>" +
        "<div class='control inline'><span>&#9655;</span></div>" +
        "<br />" +
        "<p class='inline'>To increase your speed press</p>" +
        "<div class='control inline'>W</div>" +
        "<p class='inline'>or</p>" +
        "<div class='control inline'><span>&#9651;</span></div>" +
        "<br />" +
        "<p class='inline'>To decrease your speed press</p>" +
        "<div class='control inline'>S</div>" +
        "<p class='inline'>or</p>" +
        "<div class='control inline'><span>&#9655;</span></div>" +
        "<br />" +
        "<p>Hit <span class='space'>SPACE</span> to start, restart or pause the game</p>";
      break;
    case "pause":
      modal.innerHTML = "<h1>PAUSE</h1> <p>Press space to continue</p>";
      break;
    case "highScore":
      modal.innerHTML =
        "<h1>GAME OVER</h1> <h2>New High Score</h2> <p>You scored " +
        gameState.score +
        "</p> <p>Press space to try again!</p>";
      break;
    case "gameOver":
      modal.innerHTML =
        "<h1>GAME OVER</h1> <p>you scored " +
        gameState.score +
        "</p> <p>Press space to try again!</p>";
      break;
    default:
      modal.innerHTML = "<h1>YEEEH SNAKENGAME</h1>";
  }

  modal.classList = cssClass;
}

export { setModal };
