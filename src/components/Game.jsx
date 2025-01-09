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
    setTopScore(Math.max(score, topScore)); // if current score is higher than top score, update top score
    setScore(0);
  }

  return (
    <>
      <h1>Card Game</h1>
      {gameOver && <h1>Game Over</h1>}
      <div>
        <h2>Scores</h2>
        <span>Current score: {score}</span>
        <span>Top Score: {topScore}</span>
      </div>
      <div>
        <h2>Grid</h2>
        <Cards 
          scoreHandler={handleScoreChange} 
          gameOverHandler={handleGameOver}
        />
      </div>
    </>
  )
}

export default Game;