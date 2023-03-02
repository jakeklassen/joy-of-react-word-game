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

const GameStatus = {
  Playing: 'playing',
  Won: 'won',
  Lost: 'lost',
};

const createBlankKeys = () =>
  Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').reduce(
    (acc, key) => ({
      ...acc,
      [key]: { status: '' },
    }),
    {}
  );

function Game() {
  const [gameState, setGameState] = React.useState({
    answer: sample(WORDS),
    guesses: Array(NUM_OF_GUESSES_ALLOWED).fill({ empty: true }),
    guessCount: 0,
    keys: createBlankKeys(),
    status: GameStatus.Playing,
  });

  const { answer, guesses, guessCount, keys, status } = gameState;

  console.log({ answer });

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

    const gameWon = result.every(({ status }) => status === 'correct');
    const gameOver = gameWon || newGuesses.every(({ empty }) => !empty);

    setGameState({
      ...gameState,
      guesses: newGuesses,
      guessCount: guessCount + 1,
      keys: newKeys,
      status: gameOver
        ? gameWon
          ? GameStatus.Won
          : GameStatus.Lost
        : GameStatus.Playing,
    });
  }

  function restartGame() {
    setGameState({
      answer: sample(WORDS),
      guesses: Array(NUM_OF_GUESSES_ALLOWED).fill({ empty: true }),
      guessCount: 0,
      keys: createBlankKeys(),
      status: GameStatus.Playing,
    });
  }

  return (
    <>
      <GuessResults guesses={guesses} />

      {status === GameStatus.Won && (
        <YouWon guessCount={guessCount} onRestartClick={restartGame} />
      )}
      {status === GameStatus.Lost && (
        <YouLost answer={answer} onRestartClick={restartGame} />
      )}

      {status === GameStatus.Playing && <GuessInput onGuess={onGuess} />}
      {status === GameStatus.Playing && <Keyboard keys={keys} />}
    </>
  );
}

export default Game;
