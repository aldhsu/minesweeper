import Tile from './tile';
import _ from 'underscore';

export default class Minesweeper {
  constructor(boardsize, bombNumber, channel) {
    this.boardsize = boardsize;
    this.board = [];
    this.channel = channel

    for (let y = 0; y < boardsize; y++) {
      let row = [];
      for (let x = 0; x < boardsize; x++) {
        row.push(new Tile(y, x, this.board, this.channel))
      }
      this.board.push(row);
    }

    this.bombSet = _.sample(_.flatten(this.board), bombNumber).map((tile) => {
      return tile.becomeBomb();
    });
  }

  reveal(tile) {
    tile.reveal();
    tile.neighbours()
      .filter( tile => tile )
      .forEach(tile => {
        tile.reveal();
      })
  }
}
