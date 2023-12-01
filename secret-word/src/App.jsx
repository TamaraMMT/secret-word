/* // CSS */
import "./App.css";

/* // React */
import { userCallback, useEffect, useState } from "react";

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

function App() {
  const [gameState, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordandCategory = () => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };

  const startGame = () => {
    const { word, category } = pickWordandCategory();

    let wordLetters = word.toLowerCase().split("");

    console.log(wordLetters);

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  console.log(wrongLetters);


  const retry = () => {
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
          {gameState === "end" && <GameOver retry={retry} />}
        </div>
      </div>
    </>
  );
}

export default App;
