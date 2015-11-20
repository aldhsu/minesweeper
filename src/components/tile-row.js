import React, { Component } from 'react';
import GameTile from './game-tile';

export default class TileRow extends Component {
  render() {
    const tiles = this.props.row.map((tile, index) => {
      return (
            <GameTile tile={tile} key={index} isRevealed={tile.isRevealed} />
            )
    });

    return (
        <div className="row">
        {tiles}
        </div>
    );
  }
}
