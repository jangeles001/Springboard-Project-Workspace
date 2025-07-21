import React from 'react'
import './ItemAction.css'

const ItemAction = ({ name, deleteItem }) => {
    return (
        <>
            <button className='ItemAction-Button' onClick={() => deleteItem(name)}>Delete</button>
        </>
    )
}

export default ItemAction;