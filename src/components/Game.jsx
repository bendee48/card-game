import { useState } from 'react';
import Cards from "./Cards.jsx";
import Modal from "./Modal.jsx";

function Game() {
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  function handleScoreChange() {
    setScore(score + 1);
  }

  function handleGameOver() {
    setGameOver(true);
  }

  function handleGameWin() {
    setGameWin(true);
  }
  
  function handleReset() {
    setGameOver(false);
    setGameWin(false);
    setTopScore(Math.max(score, topScore)); // if current score is higher than top score, update top score
    setScore(0);
  }

  return (
    <>
      <div>
        <h2>Scores</h2>
        <span>Current score: {score}</span>
        <span>Top Score: {topScore}</span>
      </div>
      <div>
        <Cards 
          scoreHandler={handleScoreChange} 
          gameOverHandler={handleGameOver}
          gameWinHandler={handleGameWin}
          />
      </div>
      { gameOver ?
        <Modal heading={'Round Over'} btnText={'Play Again?'} btnHandler={handleReset}>
          {score > topScore && <p>New High Score!</p>}
          <p>Score: {score}</p>
        </Modal> :
        null
      }
      { gameWin ? 
        <Modal heading={'You Win!'} btnText={'Play Again?'} btnHandler={handleReset}>
          <p>You found 'em all!</p>
        </Modal> : 
        null
      }
    </>
  )
}

export default Game;