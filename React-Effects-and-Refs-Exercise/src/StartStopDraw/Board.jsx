import React, {useRef, useEffect, useState} from 'react';
import axios from "axios";
import Card from './Card.jsx';
import './Board.css';

function Board({ deckID }){

    const [pile, setPile] = useState([]);
    const [deckCount, setDeckCount] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const drawID = useRef(null);
    const buttonLabel = deckCount === 0 ? "Out of Cards" : isRunning ? `Stop` : `Start`;
    const abortControllerRef = useRef(null);

    async function drawCard(){

        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        if(deckCount === 0){ 
            setIsRunning(false);
            window.alert("Error: no cards remaining!")
            return
        }

        try{
        await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`, {signal: abortControllerRef.current?.signal }).then(res => {
            

            //Generate values for card position and rotation effect
            const rotationDegrees = Math.floor(Math.random() * 160) - 80;
            const xOffset = Math.floor(Math.random() * 15) - 5;
            const yOffset = Math.floor(Math.random() * 15) - 5;

            //create card object to store in pile
            const card = { 
                    image: res.data.cards[0].image,
                    value: res.data.cards[0].code,
                    rotationDegrees: rotationDegrees,
                    xOffset: xOffset,
                    yOffset: yOffset
                }

            setDeckCount(res.data.remaining);
            setPile(pile => [...pile, card]); 
            });} catch (e){
                setIsRunning(false);
                console.log(e);
            }
        }

    useEffect(() => {
        if(isRunning){
            drawID.current = setInterval(drawCard, 500);
        }
        
        return () => {
            clearInterval(drawID.current);
        }

    }, [isRunning, deckCount])
    
    return (
        <div className='Board-Container'>
            {<button disabled={deckCount === 0} onClick={() => setIsRunning(!isRunning)}>
                {buttonLabel}
            </button>}
            <div className="Card-Stack">
                {
                    pile.map((card, index) => {
                        return card !== null ? <Card key={card.value} card={card} index={index}/> : "Loading Card..."
                    })
                }
            </div>
        </div>
   )}

   export default Board