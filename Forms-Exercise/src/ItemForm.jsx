import React, { useState } from 'react'
import './ItemForm.css'

const ItemForm = ({ addInventoryItem }) => {

    const INITIAL_STATE = {
    name:"",
    quantity: "",
    description: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [submitOnce, setSubmitOnce] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({...formData, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(agreedToTerms){
            addInventoryItem({...formData});
            setFormData(INITIAL_STATE);
            setAgreedToTerms(false);
            setSubmitOnce(false);
        }else{
            setSubmitOnce(true);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='name-input-wrapper'>
                    <input 
                    type='text'
                    className={submitOnce && formData.name.trim() === "" ? 'name-input-required' : 'name-input'}
                    name='name'
                    placeholder='Item Name'
                    value={formData.name}
                    onChange={handleChange}/>
                </div>
                <div className='quantity-input-wrapper'>
                    <input 
                    type='number'
                    className={submitOnce && formData.quantity.trim() === "" ? 'quantity-input-required' : 'quantity-input'}
                    name='quantity'
                    placeholder='Quantity'
                    min="1"
                    max='999'
                    value={formData.quantity}
                    onChange={handleChange}/>
                </div>
                <div className='description-input-wrapper'>
                    <textarea 
                    type='text'
                    className={submitOnce && formData.description.trim() === "" ? 'description-input-required' : 'description-input'}
                    name='description'
                    placeholder='Purpose'
                    value={formData.description}
                    onChange={handleChange}/>
                </div>
                <div className={submitOnce && !agreedToTerms ? 'checkbox-input-wrapper-required': 'checkbox-input-wrapper'}>
                    <input
                    type='checkbox'
                    id='form-checkbox'
                    className='checkbox-input'
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms(!agreedToTerms)}/>
                    <label htmlFor='form-checkbox'>Agree to Terms</label>
                    {!agreedToTerms && submitOnce && <span className='checkbox-required'>Required</span>}
                </div>
                <button className='add-button'>Add</button>
            </form>
        </>
    )
}

export default ItemForm;