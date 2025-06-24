function Pokegame({ pokemonList }) {
  const copyList = [...pokemonList]; //Copy to Preserves original array.
  const hand1 = shuffleArray(copyList).splice(0, 4); //Pull first 4 pokemon from shuffled array.
  const hand1Xp = calculateHandXp(hand1);
  const hand2 = shuffleArray(copyList).splice(0, 4);
  const hand2Xp = calculateHandXp(hand2);

  return (
    <div>
      <Pokedex
        pokemonList={hand1}
        handName="Player 1"
        isWinner={hand1Xp > hand2Xp ? true : false}
        handXp={hand1Xp}
      ></Pokedex>
      <Pokedex
        pokemonList={hand2}
        handName="Player 2"
        isWinner={hand1Xp < hand2Xp ? true : false}
        handXp={hand2Xp}
      ></Pokedex>
    </div>
  );
}

/**
 * Shuffle an array.
 *
 *  @param {*} arr
 * @returns array
 *
 * */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIdx = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randomIdx]] = [arr[randomIdx], arr[i]]; // swap elements to shuffle
  }

  return arr;
}

/**
 * Calculate total XP of a hand
 *
 * @param {*} arr
 * @returns number
 */
function calculateHandXp(arr) {
  let totalXp = 0;
  for (const item of arr) {
    totalXp += parseInt(item.base_experience);
  }

  return totalXp;
}
