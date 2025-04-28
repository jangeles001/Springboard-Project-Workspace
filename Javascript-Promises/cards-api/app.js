let deckId = null;
let remainingCards = null;

async function getDeck(){
    let response = null;
    if(arguments.length > 0){
        response = await fetch(`https://deckofcardsapi.com/api/deck/${arguments[0]}/shuffle/`).then(results => results.json()); 
    }else{
        response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(results => results.json());
    }
        
    deckId = response.deck_id;
    remainingCards = response.remaining;
}

async function drawCard(){
    if (remainingCards <= 0) {
        alert("No cards left! Shuffling a new deck...");   // If no cards are left, generates a pop up alerting the player.
        await getDeck(deckId); // places removed cards back into the deck and shuffles
        document.getElementById('card-output').innerHTML = ""; // Clears the previous card(s) from the screen.
    }

    let response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(results => results.json());
    const card = response.cards[0];
    remainingCards = response.remaining;
    document.getElementById('card-output').innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}" />`;  // Create an <img> element and set the src to the card image
    document.getElementById('remaining-cards').innerHTML = remainingCards.toString();  // Updates the number of reamainingCards on the page
}

document.addEventListener('DOMContentLoaded', async function() {
    await getDeck(); // Get a new deck ready

    document.getElementById('draw-card-button').addEventListener('click', drawCard); // Fetches a new card when button is clicked
});