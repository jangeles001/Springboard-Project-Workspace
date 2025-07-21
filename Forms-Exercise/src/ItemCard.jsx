import React from 'react'
import './ItemCard.css'

const ItemCard = ({name, quantity, description}) => {
    return (
        <div className='item-card-wrapper'>
                <h1>{name}</h1>
                <p>Quantity: {quantity}</p>
                <p>Purpose: {description}</p>
        </div>
    )
}

export default ItemCard;