import './GameButton.css'

function GameButton({ status, attack, restart, damageRange }){

    return (
        <div className={`Circle-${status}`}>
            <div className={status} onClick={status === "Engage" ? () => attack(parseInt(damageRange)) : restart}>
                {status === "Engage" ? "Fire!" : "Restart"}
            </div>
        </div>
    )
}

export default GameButton;