import React from 'react';

function GuessInput({ onGuess }) {
  const [guess, setGuess] = React.useState('');

  function onSubmit(event) {
    event.preventDefault();

    onGuess(guess);
    setGuess('');
  }

  return (
    <form className="guess-input-wrapper" onSubmit={onSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        autoFocus
        required
        id="guess-input"
        type="text"
        value={guess}
        pattern="[A-Za-z]{5}"
        onChange={(event) => setGuess(event.target.value.toUpperCase())}
      />
    </form>
  );
}

export default GuessInput;
