import React from 'react';
import { render } from 'react-dom';
import App from './App';
import Minesweeper from './game/models/minesweeper'

// Start game loop
const game = new Minesweeper(10, 50);

render(<App game={game} />, document.getElementById('root'));
