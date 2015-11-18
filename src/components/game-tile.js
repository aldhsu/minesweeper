import React, { Component } from 'react';

export default class GameTile extends Component {
  render() {
    console.log(this.props.tile.bombCount)
    return (
      <div className="tile">
        x: {this.props.tile.x}
        y: {this.props.tile.y}
        count: {this.props.tile.bombCount}
      </div>
    );
  }
}
