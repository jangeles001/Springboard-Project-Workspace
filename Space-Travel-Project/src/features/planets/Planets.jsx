import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPlanets, getPlanetsStatus, getPlanetsError, fetchPlanets, sendSpacecraftToPlanet } from './planetsSlice.jsx'
import { selectAllSpacecrafts, fetchSpacecrafts } from '../spacecraft/SpacecraftsSlice.jsx'
import { Ship } from '../spacecraft/Ship.jsx'
import LoadingScreen from '../../components/LoadingScreen.jsx'
import SelectBox from '../../components/SelectBox.jsx'
import '../../styles/Planets.css'


const Planets = () => {

  const dispatch = useDispatch();

  const planets = useSelector(selectAllPlanets)
  const planetsStatus = useSelector(getPlanetsStatus);
  const spacecrafts = useSelector(selectAllSpacecrafts)

  const [selectedPlanetId, setSelectedPlanetId] = useState(null)
  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState(null)

  const tryDispatch = async (planetId, spacecraftId) => {
    console.log("TRYING:", planetId, spacecraftId);
    if (planetId && spacecraftId) {
      dispatch(sendSpacecraftToPlanet({ spacecraftId, targetPlanetId: planetId }))
      dispatch(fetchSpacecrafts()); // <== refresh the spacecrafts slice
      dispatch(fetchPlanets());
      setSelectedPlanetId(null)
      setSelectedSpacecraftId(null)
    }
  }
  const handlePlanetClick = (planetId) => {
    tryDispatch(planetId, selectedSpacecraftId)
    setSelectedPlanetId(planetId)
  }

  const handleSpacecraftClick = (spacecraftId) => {
    tryDispatch(selectedPlanetId, spacecraftId)
    setSelectedSpacecraftId(spacecraftId)    
  }

  useEffect(() => {
    if (planetsStatus === 'idle'){
      dispatch(fetchPlanets())
      }
    }, [planetsStatus, dispatch])

    if (planetsStatus === 'loading') {
      
      return <LoadingScreen />

    }

  return (
  <div className='planets'>
      {planets?.map(planet => {
          const planetSpacecrafts = spacecrafts?.filter(spacecraft => {
            return spacecraft.currentLocation === planet.id
          })
          const ships = planetSpacecrafts.map(ships => {
            return <Ship key={ships.id} id={ships.id} image={ships.pictureUrl} name={ships.name} capacity={ships.capacity} onImageClick={handleSpacecraftClick} />
          })
           return <SelectBox key={planet.id} id={planet.id} name={planet.name} population={planet.currentPopulation} source={planet.pictureUrl} details={ships} action="" actionName="" isRowLayout={true} onImageClick={handlePlanetClick}/>
      })}
  </div>
  )
}


export default Planets