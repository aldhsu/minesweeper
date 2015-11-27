import React, { Component } from 'react';

export default class GameTile extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
  }

  componentWillReceiveProps() {
    console.log('got props')
  }

  handleClick(event) {
    this.props.tile.reveal();
  }

  rightClick(event) {
    event.preventDefault();
    this.props.tile.flag();
  }

  get displayType() {
    return this.props.tile.isBomb ? "bomb" : this.props.tile.bombCount
  }
  classNames() {
    return `tile${this.props.tile.isFlagged ? ' flagged' : ''}`
  }

  render() {
    return (
      <div className={this.classNames()} onClick={this.handleClick} onContextMenu={this.rightClick}>
        {this.props.isRevealed ? this.displayType : ""}
      </div>
    );
  }
}
