import Title from './Title.jsx'
import Player from './Player.jsx'
import GameButton from './GameButton.jsx'
import GameResult from './GameResult.jsx'
import './SpaceGame.css'

function SpaceGame({ gameStatus, attack, playerOneHealth, playerTwoHealth, restart, damageRange }){

    const status = gameStatus === "Engage the enemy! 📣" ? "Engage" : "Restart";

    return (
        <div className='SpaceGame'>
        <Title />
        <div className='GameLayout'>
        <Player className='Player1' name="Player" playerHealth={playerOneHealth}/>
        <GameButton attack={attack} status={status} restart={restart} damageRange={damageRange}/>
        <Player className='Player2' name="Enemy" playerHealth={playerTwoHealth}/>
        </div>
        <GameResult gameStatus={gameStatus}/>
        </div>
    )
}


export default SpaceGame;