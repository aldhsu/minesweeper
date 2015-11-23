import React, { Component } from 'react';
import GameTile from './game-tile';

export default class TileRow extends Component {
  render() {
    const tiles = this.props.row.map((tile, index) => {
      return (
            <GameTile tile={tile} key={index} isRevealed={tile.isRevealed} channel={this.props.channel} />
            )
    });

    return (
        <div className="row">
        {tiles}
        </div>
    );
  }
}
