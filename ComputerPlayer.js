import Player from "./Player.js";

export default class ComputerPlayer extends Player {
  constructor(name, symbol) {
    super(name, symbol, true);
  }

  decideMove(board) {
    const availableIndices = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null);

    if (availableIndices.length === 0) return null;

    // For now, choose a random available cell
    return availableIndices[
      Math.floor(Math.random() * availableIndices.length)
    ];
  }
}
