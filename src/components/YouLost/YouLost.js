import React from 'react';

function YouLost({ answer, onRestartClick }) {
  return (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>

      <button onClick={onRestartClick}>Restart Game</button>
    </div>
  );
}

export default YouLost;
