import React, { Component } from 'react';

export default class GameTile extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps() {
    console.log('got props')
  }
  handleClick(event) {
    this.props.tile.reveal();
  }
  render() {
    return (
      <div className="tile" onClick={this.handleClick}>
        {this.props.isRevealed ? this.props.tile.bombCount : ""}
      </div>
    );
  }
}
