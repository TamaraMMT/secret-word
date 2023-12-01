import PropTypes from "prop-types";

import { useState, useRef } from "react";
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
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");

    letterInputRef.current.focus();
  };
  return (
    <div className="game">
      <p className="points">
        <span>Score: {score}</span>
      </p>

      <h1>Guess the word...</h1>
      <h3 className="clue">
        Clue for the word:<span> {pickedCategory}</span>
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
            ref={letterInputRef}
          />
          <button onClick={verifyLetter}>send</button>
        </form>
      </div>
      {wrongLetters.length > 0 && (
        <div className="wrongLettersContainer">
          <span>Letters already used: </span>
          {wrongLetters.map((letter, i) => (
            <span className="letters-alredy-used" key={i}>
              {i < wrongLetters.length - 1 ? letter + " - " : letter + "."}
            </span>
          ))}
        </div>
      )}
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
