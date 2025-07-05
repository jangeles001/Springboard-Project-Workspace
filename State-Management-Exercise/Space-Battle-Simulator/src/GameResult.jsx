import './GameResult.css'

function GameResult({ gameStatus }){
    return(
        <div className='GameResult'>
        <p>{`${gameStatus}`}</p>
        </div>
    )
}

export default GameResult;