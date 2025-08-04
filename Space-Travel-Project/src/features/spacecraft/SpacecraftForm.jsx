import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { buildSpacecraft, fetchSpacecrafts } from './SpacecraftsSlice'

import '../../styles/SpacecraftForm.css'

export const BuildCraftForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [craftName, setCraftName] = useState('')
    const [capacity, setCapacity] = useState(null)
    const [description, setDescription] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    const [firstSubmit, setFirstSubmit] = useState(false)
    const [buildRequestStatus, setBuildRequestStatus] = useState('idle')

    const onCraftNameChanged = e => setCraftName(e.target.value)
    const onCapacityChanged = e => setCapacity(Number(e.target.value))
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onPictureUrlChanged = e => setPictureUrl(e.target.value)

    const canSave = [craftName, capacity, description].every(Boolean) && buildRequestStatus === 'idle';

    const onBackClicked = () => {
        dispatch(fetchSpacecrafts())
        navigate('/Spacecrafts')
    }

    const onBuildClicked = () => {
        if(canSave) {
            try{
                setBuildRequestStatus('pending')
                dispatch(
                    buildSpacecraft({ craftName, capacity: parseInt(capacity), description, pictureUrl })
                ).unwrap()
                setCraftName('')
                setCapacity('')
                setDescription('')
                setPictureUrl('')
                setFirstSubmit(false)
            } catch(error){
                console.error('Failed to build the spacecraft', error)
            } finally {
                setBuildRequestStatus('idle')
            }
        }else{
            setFirstSubmit(true)
        }
    }

    if (buildRequestStatus === 'loading') return <LoadingScreen />;

  return (
    <div className='form'>
        <button className='craft__back__button' onClick={onBackClicked}>Back 👈</button>
        <section>
            <form>
                <input 
                type='text'
                id='craft__name'
                name='craft__Name'
                placeholder='Name'
                value={craftName}
                onChange={onCraftNameChanged}/>
                <input 
                type='number'
                id='craft__capacity'
                name='craft__capacity'
                placeholder='Capacity'
                value={capacity}
                onChange={onCapacityChanged}/>
                <textarea 
                type='text'
                id='craft__description'
                name='craft__description'
                placeholder='Description'
                value={description}
                onChange={onDescriptionChanged}/>
                <input 
                type='text'
                id='craft__pictureUrl'
                name='craft__pictureUrl'
                placeholder='Picture URL'
                value={pictureUrl}
                onChange={onPictureUrlChanged}/>
            </form>
        </section>
        <span className='craft__required'>
            {firstSubmit && (
            <ul>
                {!craftName && <li>Name Required</li>}
                {!capacity && <li>Capacity Required</li>}
                {!description && <li>Description Required</li>}
            </ul>
            )}
            <button className="craft__build__button" type='button' onClick={onBuildClicked}>Build 📐</button>
        </span>
        
    </div>
  )
}

export default BuildCraftForm;