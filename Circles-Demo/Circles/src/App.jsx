import { useState } from 'react'
import GameBoard from './GameBoard.jsx'
import './App.css'

function App() {
  const DEFAULT_CIRCLES = [{color: "blue", pos: [22,32]}, {color: "red", pos: [24,43]}, {color: "yellow", pos: [26,59]}, {color: "green", pos: [44,32]}, {color: "orange", pos: [40,53]}]

  const [Circles, setCircles] = useState(DEFAULT_CIRCLES)

  function generateCircle(){
    const randomIdx = Math.floor(Math.random() * Circles.length);
    const coordinates = generateRandomCoord();
    const newCircle = {color: Circles[randomIdx].color, pos: coordinates}
    setCircles((circles => [...circles, newCircle]))
  }

  function generateRandomCoord(){
    const randomX = Math.floor(Math.random() * 100);
    const randomY = Math.floor(Math.random() * 100);

    return [randomX, randomY]
  }

  return (
    <>
      <GameBoard circles={Circles} generateCircle={generateCircle} generateRandomCoord={generateRandomCoord}/>
    </>
  )
}

export default App
