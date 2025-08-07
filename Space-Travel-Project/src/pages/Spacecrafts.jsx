import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllSpacecrafts, getSpacecraftsStatus, getSpacecraftsError, fetchSpacecrafts } from '../features/spacecraft/SpacecraftsSlice'
import SelectBox from "../components/SelectBox"
import LoadingScreen from '../components/LoadingScreen'
import '../styles/Spacecrafts.css'
import { destroySpacecraft } from '../features/spacecraft/SpacecraftsSlice'

const Spacecrafts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spacecrafts = useSelector(selectAllSpacecrafts);
    const spacecraftsStatus = useSelector(getSpacecraftsStatus);

    const handleClick = () => {
        navigate('/form')
    }

    function destroy(id) {
        dispatch(destroySpacecraft(id))
    }

    const handleImageClick = (id) => {
      navigate(`/spacecrafts/${id}`)
  }

    useEffect(() => {
        if(spacecraftsStatus === 'idle'){
            dispatch(fetchSpacecrafts())
        }
    },[spacecraftsStatus, dispatch])

    if (spacecraftsStatus === 'loading') return <LoadingScreen />;

  return (
    <div className="spacecrafts">
        <button className="build" onClick={handleClick}> 📐Build a Spacecraft</button>
        {spacecrafts?.map(ship => {
            return <SelectBox key={ship.id} id={ship.id} source={ship.pictureUrl} details={[ship.name, ship.capacity]} action={destroy} actionName='Destroy' isRowLayout={false} onImageClick={handleImageClick}/>
        })}
    </div>
  )
}

export default Spacecrafts