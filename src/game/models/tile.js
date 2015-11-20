import _ from 'underscore';

export default class Tile {
  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.revealed = false;
    this.isBomb = false;
  }
  get isRevealed() {
    return this.revealed;
  }

  get hasBomb() {
    return this.isBomb;
  }
  becomeBomb() {
    this.isBomb = true;

    return this;
  }

  get bombCount() {
    const value = _.compact(this.neighbours).reduce((acc, tile) => {
      return acc + tile.hasBomb;
    }, 0);

    return value;
  }

  reveal() {
    this.revealed = true;
    if (this.bombCount === 0) {
      this.neighbours
        .filter((tile) => {
          return !tile.revealed
        }).forEach((tile) => {
          tile.reveal();
        });
    }
    return true;
  }

  // related positions
  get topLeft() {
    return this.safePositionCheck([this.y - 1, this.x - 1])
  }

  get topMiddle() {
    return this.safePositionCheck([this.y - 1, this.x])
  }

  get topRight() {
    return this.safePositionCheck([this.y - 1, this.x + 1])
  }

  get left() {
    return this.safePositionCheck([this.y, this.x - 1])
  }

  get right() {
    return this.safePositionCheck([this.y, this.x + 1])
  }

  get bottomLeft() {
    return this.safePositionCheck([this.y + 1, this.x - 1])
  }

  get bottomMiddle() {
    return this.safePositionCheck([this.y + 1, this.x])
  }

  get bottomRight() {
    return this.safePositionCheck([this.y + 1, this.x + 1])
  }

  safePositionCheck(offsets) {
    const [yOffset, xOffset] = offsets;
    const offGrid = ((xOffset) < 0 || (yOffset) < 0) || (xOffset === this.board.length || yOffset === this.board.length)
    if(offGrid) {
      return;
    } else {
      return this.board[yOffset][xOffset]
    }
  }

  get neighbours() {
    return _.compact([
      this.topLeft, this.topMiddle, this.topRight,
      this.left, this.right,
      this.bottomLeft, this.bottomMiddle, this.bottomRight
    ]);
  }
}
