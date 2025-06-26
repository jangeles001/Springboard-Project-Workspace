function BlackjackGame({ deck }) {
  let copyList = [...deck]; //Copy to Preserves original array.
  let drawnCards = [];
  copyList = shuffleArray(copyList); // Randomize card order.
  drawnCards.push(drawCard(copyList)); //Pull card from shuffled deck.
  drawnCards.push(drawCard(copyList)); //Pull card from shuffled deck.
  const total = calculateHandTotal(drawnCards);

  return (
    <div>
      <Table hand={drawnCards} handTotal={total}></Table>
    </div>
  );
}

/**
 * Shuffle an array.
 *
 * @template T
 * @param {T[]} arr - The array to shuffle.
 * @returns {T[]} The shuffled array.
 *
 * */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIdx = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randomIdx]] = [arr[randomIdx], arr[i]]; // swap elements to shuffle.
  }
  return arr;
}

/**
 * Draw a random card from a deck.
 *
 * @param {{ rank: string, suit: string, value: number }[]} deck - Array of card objects.
 * @returns {{ rank: string, suit: string, value: number }} A randomly selected card.
 */
function drawCard(deck) {
  const randomIdx = Math.floor(Math.random() * deck.length);
  const card = deck[randomIdx];
  deck.splice(randomIdx, 1);

  return card;
}

/**
 * Calculate the total value in your hand.
 *
 * @param {{ value: number }[]} hand.
 * @returns {number} The total hand value.
 */
function calculateHandTotal(hand) {
  let total = 0;
  for (const card of hand) {
    total += card.value;
  }
  return total;
}
