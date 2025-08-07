import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import  { useSelector, useDispatch } from 'react-redux'
import { selectSelectedSpacecraft, getSpacecraftById } from './SpacecraftsSlice';
import LoadingScreen from '../../components/LoadingScreen';
import '../../styles/Spacecraft.css'

export default function Spacecraft() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: spacecraft, status, error } = useSelector(selectSelectedSpacecraft);

    useEffect(() => {
        dispatch(getSpacecraftById(id))
    },[])

    if (status === 'loading') return <LoadingScreen />;
    if (status === 'failed') return <p>Error: {error}</p>;
    if (!spacecraft) return <p>No spacecraft found.</p>;

    return (
        <div className='spacecraft'>
            <img className='spacecraft__img' src={spacecraft.pictureUrl ? `/${spacecraft.pictureUrl}` : '/rocket-b.svg'}></img>
            <div className='spacecraft__details'>
                <span className='spacecraft__specifications'>
                    <p>Name: {spacecraft.name}</p>
                    <p>Capacity: {spacecraft.capacity}</p>
                </span>
                <span className='spacecraft__description'>
                    <p>Description:</p>
                    <p>{spacecraft.description}</p>
                </span>
            </div>
        </div>
    )
}
