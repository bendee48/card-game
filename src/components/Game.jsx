import { useState } from 'react';
import helpIcon from '../assets/help.svg';
import Cards from "./Cards.jsx";
import Modal from "./Modal.jsx";

/**
 * Game component that displays the main game elements and manages game state.
 * @component
 */
function Game() {
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [help, setHelp] = useState(false);

  /**
   * Increases the current score by 1.
   */
  function handleScoreChange() {
    setScore(score + 1);
  }

  /**
   * Sets gameOver state to true.
   */
  function handleGameOver() {
    setGameOver(true);
  }

  /**
   * Sets gameWin state to true.
   */
  function handleGameWin() {
    setGameWin(true);
  }

  /**
   * Toggles help modal visibility.
   */
  function handleHelp() {
    setHelp(!help);
  }
  
  /**
   * Resets game state for a new round.
   */
  function handleReset() {
    setGameOver(false);
    setGameWin(false);
    setTopScore(Math.max(score, topScore)); // if current score is higher than top score, update top score
    setScore(0);
  }

  return (
    <>
      <h1 className="main-title">Super Awesome Fun Memory Card Game</h1>
      <img src={helpIcon} onClick={handleHelp} className="help-icon" title="How to Play" alt="Help" />
      <div className='scores'>
        <span>Current score: {score}</span>
        <span>Top Score: {topScore}</span>
      </div>
      <div>
        <Cards 
          onUpdateScore={handleScoreChange} 
          onGameOver={handleGameOver}
          onGameWin={handleGameWin}
          />
      </div>
      { gameOver ?
        <Modal heading={'Round Over'} btnText={'Play Again?'} onClick={handleReset}>
          {score > topScore && <p>New High Score!</p>}
          <p>Score: {score}</p>
        </Modal> :
        null
      }
      { gameWin ? 
        <Modal heading={'You Win!'} btnText={'Play Again?'} onClick={handleReset}>
          <p>You found 'em all!</p>
        </Modal> : 
        null
      }
      { help ? 
        <Modal heading={'How to Play'} btnText={'Close'} onClick={handleHelp}>
          <p>This is a game of memory.</p>
          <p>Simply select all the unique Pokémon.</p>
          <p>Sounds easy? Well hold onto yer britches there youngster... after each selection the deck is shuffled.</p>
          <p>Can you remember which cards you've already chosen?</p>
        </Modal> :
        null
      }
    </>
  )
}

export default Game;