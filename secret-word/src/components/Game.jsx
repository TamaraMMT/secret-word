import "./Game.css";

const Game = ({ verifyLetter }) => {
  return (
    <div>
      <h2> Finish game</h2>
      <button onClick={verifyLetter}>end game</button>
    </div>
  );
};
export default Game;
