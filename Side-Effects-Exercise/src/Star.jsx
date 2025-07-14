import React, {useRef, useEffect} from 'react'
import './Star.css'

function Star({ star, onClick, shouldFocus, onFocus }){

    const lastStarRef = useRef();

    useEffect(() => {
        let timeoutID = null;

        if(shouldFocus && lastStarRef.current){
             timeoutID = setTimeout(() => lastStarRef.current?.focus(), 25);
        }

        return () => timeoutID ? clearTimeout(timeoutID) : "";

    },[shouldFocus])

    
    return (
        <div
        ref={lastStarRef} 
        className='Star'
        onClick={onClick}
        style={{
            position: "absolute",
            top: `${star.coordinates[1]}%`,
            left: `${star.coordinates[0]}%`
        }}
        tabIndex='0'
        onFocus={onFocus}>
            ⭐
        </div>
    )
}

export default Star;