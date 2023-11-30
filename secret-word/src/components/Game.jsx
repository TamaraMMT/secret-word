import "./Game.css";

const Game = ({ verifyLetter }) => {
  return (
    <div>
      <h1> Finish game</h1>
      <button onClick={verifyLetter}>end game</button>
    </div>
  );
};
export default Game;
