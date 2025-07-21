import React from 'react'
import ItemCard from './ItemCard.jsx'
import ItemAction from './ItemAction.jsx'
import './InventoryDisplay.css'

const InventoryDisplay = ({name, quantity, description, deleteItem}) => {
    return (
        <div className='item-display'>
            <ItemCard name={name} quantity={quantity} description={description}/>
            <ItemAction name={name} deleteItem={deleteItem}/>
        </div>
    )
}

export default InventoryDisplay;