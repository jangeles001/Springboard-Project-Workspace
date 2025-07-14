React Effects and Refs Exercise

## **Part 1: Click to Draw**

This first app displays a deck of cards, one card at a time. When the page loads, I send a request to the [Deck of Cards API](http://deckofcardsapi.com/) to create a new deck, and show a button on the page that will let you draw a card.

Every time you click the button, display a new card, until there are no cards left in the deck. If you try to draw when there are no cards remaining, an alert message appears on the screen with the text “Error: no cards remaining!”.

## **Part 2: Shuffle The Deck**

Adds a button that when clicked, shuffles the deck, so that you can start drawing from a full deck without refreshing the page. Will make a call to the cards api to shuffle the existing deck. The button will not be clickable while the shuffle is in progress. The shuffle removes all of the cards from the screen.

## **Further Study**

- Styles app so that it looks nice.
- When you click on the button rather than drawing a single card, the page will draw one card every second. These draws will continue until you press the button again, or until the deck has been exhausted (at which point the alert message from Part 1 will appear). The button will change text appropriately. (for example, it toogles between “Start” and “Stop”
