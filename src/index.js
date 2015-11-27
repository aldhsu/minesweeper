import React from 'react';
import { render } from 'react-dom';
import App from './App';
import Minesweeper from './game/models/minesweeper'
import Events from 'events';

// Start game loop
const channel = new Events();
const game = new Minesweeper(10, 10, channel);

function renderGame() {
  render(<App game={game} channel={channel}/>, document.getElementById('root'));
}

channel.on('reveal', renderGame);

renderGame();
