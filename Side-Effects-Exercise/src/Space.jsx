import React, {useEffect, useState, useRef} from 'react'
import Star from './Star.jsx'
import './Space.css'

function Space(){
    const [activeStars, setActiveStars] = useState([]);
    const [focusedStarKey, setFocusedStarKey] = useState(null); 
    const generateStarID = useRef(null);

    /**
     * Removes star from the active stars array based on the star key provided then sets the focus
     * to the previousStar.
     * 
     * @param {number} keyToRemove 
     */
    function removeStar(keyToRemove){
        setActiveStars(prevStars => {
            const index = prevStars.findIndex(star => star.key === keyToRemove);
            const newStars = prevStars.filter(star => star.key !== keyToRemove);

            if (newStars.length === 0) {
                setFocusedStarKey(null);
            } else {
                const nextStar = newStars[index] || newStars[index - 1];
            if (nextStar) {
                setFocusedStarKey(nextStar.key);
            }
        }

        return newStars;
  });

    }

    /**
     * Generates random (x,y) coordinate pair within the range [0,99].
     * 
     * @returns {[number, number]} An array containing the x and y coordinates
     */
    function generateRandomCoord(){
        const randomX = Math.floor(Math.random() * 100);
        const randomY = Math.floor(Math.random() * 100);

        return [randomX, randomY]
    }

    useEffect(() => {

        function generateStar(){
            const coordinates = generateRandomCoord();
            const star = {
                key: crypto.randomUUID(),
                coordinates 
            }
            setActiveStars(activeStars => [...activeStars, star]);
        }

        generateStarID.current = setInterval(generateStar, 2500)
        
        return () => {
            clearInterval(generateStarID.current);
        }


    },[])

    useEffect(() => {
        if (activeStars.length === 0) return;
        
        const lastStar = activeStars[activeStars.length - 1];

        // Only auto-focus new star if the last star is truly new
        // and the user isn't manually focusing another star
        if (focusedStarKey !== lastStar.key) {
            setFocusedStarKey(lastStar.key);
        }
    }, [activeStars.length]);

    return (
        <>
            <div className='Space-field'>
                {activeStars.map((star, index) => {
                    const isLast = index === activeStars.length - 1;
                    return <Star key={star.key} star={star} shouldFocus={isLast} onFocus={()=>setFocusedStarKey(star.key)} onClick={() => removeStar(star.key)}/>
                })}
            </div>
        </>
    )
}

export default Space;