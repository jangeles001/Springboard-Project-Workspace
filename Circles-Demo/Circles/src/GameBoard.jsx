import Circle from './Circle.jsx'

function GameBoard({ circles, generateCircle }) {
    return (
        <div className="GameBoard">
        {circles.map((circle, idx) => <Circle key={idx} color={circle.color} coords={circle.pos} idx={idx}/>)}
        <button onClick={generateCircle}>Make New Circle</button>
        </div>
    )
}

export default GameBoard;