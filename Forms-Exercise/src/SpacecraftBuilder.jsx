import React, { useState } from 'react'
import ItemForm from './ItemForm.jsx'
import './ItemForm.css'
import InventoryDisplay from './InventoryDisplay.jsx'
import "./SpacecraftBuilder.css"



const SpacecraftBuilder = () => {
    const [inventory, setInventory] = useState([])

    const addInventoryItem = ({name, quantity, description}) => {
        setInventory(prevInventory => [
            ...prevInventory, {
                name, 
                quantity, 
                description
            }
        ]);
    }

    const deleteItem = (name) => {
        setInventory(prevInventory => 
            prevInventory.filter((item) => item.name !== name));
    };

    return (
    <div className='SpacecraftBuilder-Container'>
        <h1>Spacecraft Builder</h1>
        <h3>Add an Item to the Inventory</h3>
        <ItemForm addInventoryItem={addInventoryItem}/>
        <h1>Inventory</h1>
        <div className='display-wrapper'>
            {inventory && inventory.map(({name, quantity, description}, idx) => <InventoryDisplay key={idx} name={name} quantity={quantity} description={description} deleteItem={deleteItem}/>)}
        </div>
    </div>
    )
}

export default SpacecraftBuilder;