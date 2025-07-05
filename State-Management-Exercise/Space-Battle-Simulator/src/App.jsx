import { useState, useEffect } from 'react'
import SpaceGame from './SpaceGame.jsx'
import './App.css'

function App() {
  
  const [playerOneHealth, setPlayerOneHealth] = useState(100);
  const [playerTwoHealth, setPlayerTwoHealth] = useState(100);
  const [gameStatus, setGameStatus] = useState("Engage the enemy! 📣")

  function attack(range){
    setPlayerOneHealth((health => Math.max(0,health - generateRandomDamage(range))));
    setPlayerTwoHealth((health => Math.max(0,health - generateRandomDamage(range))));
  }

  /**
   * Generate random number within the range of 1-50.
   * 
   * @returns int random number
   */
  function generateRandomDamage(range){
    return Math.floor(Math.random() * range);
  }

  /**
   * Set the game state to initial values.
   */
  function restart(){
    setPlayerOneHealth(100);
    setPlayerTwoHealth(100);
    setGameStatus("Engage the enemy! 📣");
  }

  /**
   * Determine the current game status message based on player health values.
   * 
   * @param {number} p1 - Health value of player one (0–100).
   * @param {number} p2 - Health value of player two (0–100).
   * @returns {string} Game status message to display.
   */
  function getGameStatus(p1, p2) {
  if (p1 === 0 && p2 === 0) return "It's a draw! 🤝 Both spacecrafts have been neutralized.";
  if (p1 === 0) return "Mission Failed. 😵 Your spacecraft has been defeated.";
  if (p2 === 0) return "Congratulations! 😎💪 You've successfully defended your spacecraft.";
  return "Engage the enemy! 📣";
}

  useEffect(() => {
    setGameStatus(getGameStatus(playerOneHealth, playerTwoHealth))
  }, [playerOneHealth, playerTwoHealth])
  
  
  return (
    <>
      <SpaceGame gameStatus={gameStatus} attack={attack} playerOneHealth={playerOneHealth} playerTwoHealth={playerTwoHealth} restart={restart} damageRange={50}/>    
    </>
  )
}

export default App
