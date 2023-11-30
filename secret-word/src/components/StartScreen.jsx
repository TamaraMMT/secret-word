import './StartScreen.css'

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>Click the button to come play</p>
      <button onClick={startGame}>Play!</button>
    </div>
  );
};
export default StartScreen