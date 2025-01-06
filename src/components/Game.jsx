import { useState } from 'react';
import Cards from "./Cards.jsx";

function Game() {
  const [score, setScore] = useState(0);

  function handleScoreChange() {
    setScore(score + 1);
  }

  return (
    <>
      <h1>Card Game</h1>
      <div>
        <h2>Scores</h2>
        <span>{score}</span>
      </div>
      <div>
        <h2>Grid</h2>
        <Cards scoreHandler={handleScoreChange}/>
      </div>
    </>
  )
}

export default Game;