import './Card.css'

function Card({ card, index}){

    return(
        <div className="Board-Card"  style={{
                transform: `translate(${card.xOffset}px, ${card.yOffset}px) rotate(${card.rotationDegrees}deg)`, 
                zIndex: index,
                position: 'absolute'
                
            }}>
        <img src={card.image}></img>
        </div>
    )
}

export default Card