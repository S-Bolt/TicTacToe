export default class Board {
  constructor() {
    this.cells = Array(9).fill(null);
  }

  makeMove(index, symbol) {
    if (this.cells[index] === null) {
      this.cells[index] = symbol;
      return true;
    }
    return false;
  }

  checkWin() {
    const winningCombinations = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];

    for (const combination of winningCombinations){
        const [a, b, c] = combination;
        if(
            this.cells[a] &&
            this.cells[a] === this.cells[b] &&
            this.cells[a] === this.cells[c]
        ) {
            return {winner: this.cells[a], combination};
        }
    }

    //check for draw
    if(!this.cells.includes(null)){
        return {winner: 'Draw'}
    }
    return null;
  }

  reset(){
    this.cells = Array(9).fill(null)
  }
}
