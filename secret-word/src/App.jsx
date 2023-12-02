/* // CSS */
import "./App.css";

/* // React */
import { useCallback, useEffect, useState } from "react";

/* // data */
import { wordsList } from "./data/words";

/* components */
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 5;

function App() {
  const [gameState, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordandCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    //clear all letters
    clearLetterStates();

    const { word, category } = pickWordandCategory();
    let wordLetters = word.toLowerCase().split("");
    // Update the game state with the selected word, category, and letters
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    // Transition to the "game" state
    setGameStage(stages[1].name);
  }, [pickWordandCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      // If so, add the letter to the list of guessed letters
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      // If not, add the letter to the list of wrong letters and decrement the remaining guesses
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
    setGuesses(guessesQty);
  };

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetter = [...new Set(letters)];
    //win condition
    if (
      guessedLetters.length === uniqueLetter.length &&
      gameState === stages[1].name
    ) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      //restart game and word
      startGame();
    }

    console.log(uniqueLetter);
  }, [guessedLetters, letters, startGame]);

  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  };

  return (
    <>
      <div className="App">
        <div className="container">
          {gameState === "start" && <StartScreen startGame={startGame} />}
          {gameState === "game" && (
            <Game
              verifyLetter={verifyLetter}
              pickedWord={pickedWord}
              pickedCategory={pickedCategory}
              letters={letters}
              guessedLetters={guessedLetters}
              wrongLetters={wrongLetters}
              guesses={guesses}
              score={score}
            />
          )}
          {gameState === "end" && <GameOver retry={retry} score={score} />}
        </div>
      </div>
    </>
  );
}

export default App;
