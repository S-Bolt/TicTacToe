import Player from "./Player.js";
import Board from "./Board.js";
import ComputerPlayer from "./ComputerPlayer.js";

export default class Game {
  constructor(
    singlePlayer = true,
    player1Name = "Player 1",
    player2Name = "Computer"
  ) {
    //initialize game based on game mode
    if (singlePlayer) {
      this.player1 = new Player(player1Name, "X");
      this.player2 = new ComputerPlayer(player2Name, "O");
    } else {
      this.player1 = new Player(player1Name, "X");
      this.player2 = new Player(player2Name, "O");
    }
    this.singlePlayer = singlePlayer;
    this.currentPlayer = this.player1;

    //initialize the board
    this.board = new Board();

    //initialize scores
    this.player1Score = 0;
    this.player2Score = 0;

    //create and bind score display
    this.scoreDisplay = document.getElementById("score-display");
    this.updateScoreDisplay();

    //buind ui elements

    this.cells = document.querySelectorAll(".cell");
    this.restartButton = document.getElementById("restart");

    // bind methods
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleRestart = this.handleRestart.bind(this);

    // add event listeners
    console.log("Cells:", this.cells);
    this.cells.forEach((cell) =>
      cell.addEventListener("click", this.handleCellClick)
    );
    this.restartButton.addEventListener("click", this.handleRestart);
    //flag to indicate game over
    this.gameOver = false;
  }

  updateScoreDisplay() {
    this.scoreDisplay.innerHTML = `
    <p>${this.player1.name} (X): ${this.player1Score}</p>
    <p>${this.player2.name} (X): ${this.player2Score}</p>
    `;
  }

  handleCellClick(event) {
    if (this.gameOver) return;

    const index = event.target.dataset.index;

    if (this.board.cells[index] !== null) {
      return;
    }

    //Make the move
    const moveMade = this.board.makeMove(index, this.currentPlayer.symbol);
    if (moveMade) {
      event.target.textContent = this.currentPlayer.symbol;

      //check for win/draw
      const result = this.board.checkWin();
      if (result) {
        if (result.winner === "Draw") {
          alert("It's a draw");
        } else {
          alert(`${this.currentPlayer.name} wins!`);
          //update score
          if (this.currentPlayer === this.player1) {
            this.player1Score++;
          } else {
            this.player2Score++;
          }
          this.updateScoreDisplay();
          //highlight winning cells
          console.log("Winning combination:", result.combination);
          result.combination.forEach((idx) => {
            const cell = this.cells[idx];
            if (cell) {
              cell.classList.add("winner");
            } else {
              console.error("Invalid cell index:", idx, "Cell is undefined");
            }
          });
        }
        this.gameOver = true;
        //disable clicks
        this.cells.forEach((cell) =>
          cell.removeEventListener("click", this.handleCellClick)
        );
        return;
      }

      //switch turns
      this.switchPlayer();

      //if single player and its computer's turn
      if (this.singlePlayer && this.currentPlayer === this.player2) {
        setTimeout(() => this.aiMove(), 500);
      }
    }
  }

  switchPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  aiMove() {
    if (this.gameOver) return;

    //use cpu players' decide move method
    const aiMoveIndex = this.player2.decideMove(this.board.cells);

    if (aiMoveIndex === null) return;

    //simulate ai thinking time
    setTimeout(() => {
      const moveMade = this.board.makeMove(
        aiMoveIndex,
        this.currentPlayer.symbol
      );
      if (moveMade) {
        //update ui
        this.cells[aiMoveIndex].textContent = this.currentPlayer.symbol;

        //check for win /draw
        const result = this.board.checkWin();
        if (result) {
          if (result === "Draw") {
            alert("It's a draw");
          } else {
            alert(`${this.currentPlayer} wins!`);
            //update score
            if (this.currentPlayer === player1) {
              this.player1Score++;
            } else {
              this.player2Score++;
            }
            this.updateScoreDisplay();
            //highlight winning cells
            result.combination.forEach((idk) => {
              this.cells[idk].classList.add("winner");
            });
          }
          this.gameOver = true;
          this.cells.forEach((cell) =>
            cell.removeEventListener("click", this.handleCellClick)
          );
          return;
        }
        this.switchPlayer();
      }
    }, 500);
  }

  handleRestart() {
    this.board.reset();

    this.cells.forEach((cell) => {
      cell.textContent = "";
      cell.classlist.remove("winner");
      cell.addEventListener("click", this.handleCellClick);
    });

    this.currentPlayer = this.player1;

    this.gameOver = false;
  }
}
