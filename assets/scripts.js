import Game from "./Game.js";

document.addEventListener("DOMContentLoaded", () => {
  const singlePlayerButton = document.getElementById("single-player");
  const twoPlayerButton = document.getElementById("two-player");
  const gameContainer = document.getElementById("game");
  const modeSelection = document.getElementById("mode-selection");
  const restartButton = document.getElementById("restart");
  const scoreDisplay = document.getElementById("score-display");

  let game;

  singlePlayerButton.addEventListener("click", () => {
    modeSelection.style.display = "none";
    gameContainer.style.display = "grid";
    restartButton.style.display = "block";
    scoreDisplay.style.display = "flex";
    game = new Game(true, "Player 1", "Computer");
  });

  twoPlayerButton.addEventListener("click", () => {
    modeSelection.style.display = "none";
    gameContainer.style.display = "grid";
    restartButton.style.display = "block";
    scoreDisplay.style.display = "flex";
    game = new Game(false, "Player 1", "Player 2");
  });

  restartButton.addEventListener("click", () => {
    game.handleRestart();
  });
});
