import './Player.css'

function Player({name, playerHealth}){
    return(
        <div className={name}>
            <p>
                {name} Health: {playerHealth} 
                {playerHealth === 100 && ' ❤️'}
                {playerHealth < 100 && playerHealth !==0 && ' ❤️‍🩹'}
                {playerHealth === 0 && ' 💀'}
            </p>
        </div>
    )    
}

export default Player;