import React, {useRef, useState} from 'react';
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

        if(deckCount === 0){
            await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`);
            setPile([]);
            setDeckCount(null);
            return
        }

        await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`, {signal: abortControllerRef.current?.signal}).then(res => {
            
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
            setPile(pile => [...pile, card])
        });
    }
    
    
    return (
        <div className='Board-Container'>
            {<button onClick={drawCard}>{deckCount !== 0  ? `Gimmie a Card!` : `Reshuffle`}</button>}
            <div className="Card-Stack">
                {
                    pile.map((card, index) => {
                        return card !== null ? <Card key={card.value} card={card} index={index}/> : "... Loading ..."
                    })
                }
            </div>
        </div>
   )}

   export default Board