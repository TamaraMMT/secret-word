import PropTypes from "prop-types";

import "./GameOver.css";

const GameOver = ({ retry }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={retry}>Reset</button>
    </div>
  );
};

GameOver.propTypes = {
  retry: PropTypes.func,
};

export default GameOver;
