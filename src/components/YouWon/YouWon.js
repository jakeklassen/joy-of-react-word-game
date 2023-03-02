import React from 'react';

function YouWon({ guessCount, onRestartClick }) {
  return (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>{guessCount} guesses</strong>.
      </p>

      <button onClick={onRestartClick}>Restart Game</button>
    </div>
  );
}

export default YouWon;
