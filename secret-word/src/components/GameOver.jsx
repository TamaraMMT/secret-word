import PropTypes from "prop-types";

import "./GameOver.css";

const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>
        Your score: <span className="score-end-game">{score}</span>
      </h2>
      <button onClick={retry}>Reset</button>
    </div>
  );
};

GameOver.propTypes = {
  retry: PropTypes.func,
};

export default GameOver;
