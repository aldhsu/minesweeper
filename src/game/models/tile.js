import _ from 'underscore';

export default class Tile {
  constructor(y, x, board, channel) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.revealed = false;
    this.isBomb = false;
    this.channel = channel;
    this.isFlagged = false;
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
    const value = this.neighbours.reduce((acc, tile) => {
      return acc + tile.hasBomb;
    }, 0);

    return value;
  }

  reveal() {
    this.revealed = true;
    if (this.bombCount === 0) {
      this.neighbours
        .filter((tile) => {
          return !tile.revealed && !tile.isBomb
        }).forEach((tile) => {
          tile.reveal();
        });
    }
    this.channel.emit('reveal');
    return true;
  }

  flag() {
    this.isFlagged = true;
    this.channel.emit('reveal');
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
    const offGrid = ((xOffset) < 0 || (yOffset) < 0) || (xOffset > this.board.length - 1 || yOffset > this.board.length - 1)

    if(offGrid) {
      return;
    } else {
      return this.board[yOffset][xOffset]
    }
  }

  get neighbours() {
    const neighbours = [];

    for (var y = -1; y <= 1; y++) {
      for (var x = -1; x <= 1; x++) {
        if (y === 0 && x === 0) {
          continue;
        } else {
          neighbours.push(this.safePositionCheck([this.y + y, this.x + x]));
        }
      }
    }
    return _.compact(neighbours);
  }
}
