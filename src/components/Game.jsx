import { useState } from 'react';
import Cards from "./Cards.jsx";

function Game() {
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function handleScoreChange() {
    setScore(score + 1);
  }

  function handleGameOver() {
    setGameOver(true);
  }
  
  function handleReset() {
    setGameOver(false);
    setTopScore(Math.max(score, topScore)); // if current score is higher than top score, update top score
    setScore(0);
  }

  return (
    <>
      { gameOver ? 
        <div className='modal'>
          <div className='modal-menu'>
            <h1>Round Over</h1>
            <p>Score: {score}</p>
            <button onClick={handleReset}>Play Again?</button>
          </div>
        </div> :
        null
      }
      <div>
        <h2>Scores</h2>
        <span>Current score: {score}</span>
        <span>Top Score: {topScore}</span>
      </div>
      <div>
        <Cards 
          scoreHandler={handleScoreChange} 
          gameOverHandler={handleGameOver}
        />
      </div>
    </>
  )
}

export default Game;