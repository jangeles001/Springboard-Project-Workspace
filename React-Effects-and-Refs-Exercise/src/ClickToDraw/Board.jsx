import React, {useRef, useState,useEffect} from 'react';
import axios from "axios";
import Card from './Card.jsx';
import './Board.css';

function Board({ deckID }){

    const [pile, setPile] = useState([]);
    const [deckCount, setDeckCount] = useState(null);
    const abortControllerRef = useRef(null);

  
    async function drawCard(){

        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
         
        await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`, {singal: abortControllerRef.current?.signal}).then(res => {
            
        //Generate values for card stacking and rotation effect    
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
        });
    }

    useEffect(() => {
        if(deckCount === 0){
            window.alert("Error: no cards remaining!")
        }
    },[deckCount])
    
    
    return (
        <div className='Board-Container'>
            {deckCount !== 0 && <button onClick={drawCard}>Gimmie a Card!</button>}
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