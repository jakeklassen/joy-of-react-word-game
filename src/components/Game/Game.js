import React from 'react';

import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { WORDS } from '../../data';
import { checkGuess, determineBestKeyStatus } from '../../game-helpers';
import { sample } from '../../utils';
import GuessInput from '../GuessInput/GuessInput';
import GuessResults from '../GuessResults/GuessResults';
import Keyboard from '../Keyboard/Keyboard';
import YouLost from '../YouLost/YouLost';
import YouWon from '../YouWon/YouWon';

const GameState = {
  Playing: 'playing',
  Won: 'won',
  Lost: 'lost',
};

function Game() {
  const [answer, setAnswer] = React.useState(() => sample(WORDS));

  // To make debugging easier, we'll log the solution in the console.
  console.info({ answer });

  const [guesses, setGuesses] = React.useState(
    Array(NUM_OF_GUESSES_ALLOWED).fill({ empty: true })
  );

  const [keys, setKeys] = React.useState(
    Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').reduce((acc, key) => {
      acc[key] = { status: '' };
      return acc;
    }, {})
  );
  const [gameState, setGameState] = React.useState(GameState.Playing);
  const [guessCount, setGuessCount] = React.useState(0);

  function onGuess(guess) {
    const newGuesses = [...guesses];
    const nextEmptyIndex = newGuesses.findIndex(({ empty }) => empty);

    if (nextEmptyIndex === -1) {
      console.warn('No more guesses allowed');

      return;
    }

    const result = checkGuess(guess, answer);

    newGuesses[nextEmptyIndex] = {
      value: guess,
      result,
      empty: false,
    };

    const newKeys = { ...keys };
    for (const key of result) {
      newKeys[key.letter].status = determineBestKeyStatus(
        newKeys[key.letter].status,
        key.status
      );
    }

    setKeys(newKeys);

    const gameWon = result.every(({ status }) => status === 'correct');
    const gameOver = gameWon || newGuesses.every(({ empty }) => !empty);

    setGuessCount(guessCount + 1);
    setGuesses(newGuesses);
    setGameState(
      gameOver ? (gameWon ? GameState.Won : GameState.Lost) : GameState.Playing
    );
  }

  function restartGame() {
    setAnswer(sample(WORDS));
    setGuesses(Array(NUM_OF_GUESSES_ALLOWED).fill({ empty: true }));
    setKeys(
      Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').reduce((acc, key) => {
        acc[key] = { status: '' };
        return acc;
      }, {})
    );
    setGameState(GameState.Playing);
    setGuessCount(0);
  }

  return (
    <>
      <GuessResults guesses={guesses} />

      {gameState === GameState.Won && (
        <YouWon guessCount={guessCount} onRestartClick={restartGame} />
      )}
      {gameState === GameState.Lost && (
        <YouLost answer={answer} onRestartClick={restartGame} />
      )}

      {gameState === GameState.Playing && <GuessInput onGuess={onGuess} />}
      {gameState === GameState.Playing && <Keyboard keys={keys} />}
    </>
  );
}

export default Game;
