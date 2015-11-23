import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';
import TileRow from './components/tile-row';

export default class App extends Component {
  render() {
    const rows = this.props.game.board.map((row, index) => {
      return (
            <TileRow row={row} key={index} channel={this.props.channel} />
            )
    });

    return (
      <div>
        {rows}
      </div>
    );
  }
}
