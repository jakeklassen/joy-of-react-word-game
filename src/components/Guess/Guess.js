import React from 'react';

function Guess({ guess }) {
  const result = guess.empty ? Array(5).fill({ letter: '' }) : guess.result;

  return (
    <p className="guess">
      {result.map(({ letter, status }, index) => (
        <span className={status ? `cell ${status}` : 'cell'} key={index}>
          {letter}
        </span>
      ))}
    </p>
  );
}

export default Guess;
