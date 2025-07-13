import React, {useState, useEffect} from 'react'
import Board from './Board.jsx'
import axios from 'axios'
import './App.css'

function App() {

  const [deckID, setDeckID] = useState(null);

   useEffect(() => {
      async function getDeckID(){
         await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`).then(res => {
            setDeckID(res.data.deck_id);
        });
      }
      
      getDeckID();

    },[]);

  return (
    <>
    <Board deckID={deckID}/>
    </>
  )
}

export default App
