import './StartScreen.css'
import PropTypes from "prop-types";

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>Click the button to come play</p>
      <button onClick={startGame}>Play!</button>
    </div>
  );
};

StartScreen.propTypes = {
  startGame: PropTypes.func,
};

export default StartScreen