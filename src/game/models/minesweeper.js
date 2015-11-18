import Tile from './tile';
import _ from 'underscore';

export default class Minesweeper {
  constructor(boardsize, bombNumber) {
    console.log(boardsize);
    this.boardsize = boardsize;
    this.board = [];

    for (let x = 0; x < boardsize; x++) {
      let row = [];
      for (let y = 0; y < boardsize; y++) {
        row.push(new Tile(x, y, this.board))
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
