import PropTypes from "prop-types";

import { useState } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
  };
  return (
    <div className="game">
      <p className="points">
        <span>Score: {score}</span>
      </p>

      <h1>Guess the Word</h1>
      <h3 className="clue">
        Clue for the word:
        <span>{pickedCategory}</span>
      </h3>
      <p>You still have {guesses} attempt(s).</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Guess the letters of the word.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
          />
          <button onClick={verifyLetter}>send</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letters alredy used.</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>
    </div>
  );
};

Game.propTypes = {
  verifyLetter: PropTypes.func.isRequired,
  pickedWord: PropTypes.string.isRequired,
  pickedCategory: PropTypes.string.isRequired,
  letters: PropTypes.array.isRequired,
  guessedLetters: PropTypes.array.isRequired,
  wrongLetters: PropTypes.array.isRequired,
  guesses: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
export default Game;
