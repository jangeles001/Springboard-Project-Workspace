/* Task 1: Unveiling the Coordinates */
const coordinates = { x: 34, y: 42, z: 67 };
const { x, y } = coordinates;

console.log(`Secret Coordniates: X:${x},Y:${y}`);

/* Task 2: The Map of Secrets */
const locations = {
  first: "Cave of Wonders",
  second: "Lake of Mystery",
  third: "Mount of Ages",
  fourth: "Desert of Shadows",
};
const { first, second, ...remaining } = locations;

console.log(`Key Locations: ${first}, ${second}`);

/* Task 3: The Mysterious Door */
const doorCode = {
  upper: "Alpha",
  lower: "Omega",
};
const { upper = "Alpha", lower = "Omega", middle = remaining.third } = doorCode;

console.log(upper, middle, lower);

/* Task 4: The Guardian's Riddle */
const riddle = {
  ancientWord: "Sphinx",
  modernWord: "Cat",
};
const { ancientWord: translation } = riddle;

console.log(translation);

/* Task 5: The Array of Elements */
const elements = ["Fire", "Water", "Earth", "Air"];
const [firstElement, secondElement, ...otherElements] = elements;

console.log(`Essential Elements: ${firstElement} and ${secondElement}`);

/* Task 6: Skipping Stones */
const stones = [1, 2, 3, 4, 5, 6];
const [firstStone, , , , , sixthStone] = stones;

console.log(`Extracted Stones: ${firstStone} and ${sixthStone}`);

/* Task 7: The Array of Shadows */
const shadows = ["Darkness", "Silence", "Whisper", "Echo"];
const [firstShadow, ...hiddenShadows] = shadows;

console.log(`Visible Shadow: ${firstShadow}\nHidden Shadows: ${hiddenShadows}`);

/* Task 8: The Wise Function */
const revealPath = ({ direction, distance }) =>
  console.log(`Direction: ${direction}\nDistance: ${distance}`);

revealPath({ direction: "North", distance: 200 });

/* Task 9: The Scroll of Defaults */
const mixPotion = ({ ingredient1 = "Water", ingredient2 = "Fireflower" }) =>
  console.log(`Mixing: ${ingredient1} and ${ingredient2}`);

mixPotion({});
mixPotion({ ingredient1: "Not Water", ingredient2: "WaterFlower" });

/* Task 10: The Array Spell */
const castSpell = ([firstIngredient, secondIngredient]) =>
  console.log(`Casting Spell: ${firstIngredient} ${secondIngredient}`);

castSpell(["Fireflower", "Water", "Fire", "Earth", "Ice"]);

/* Task 11: The Nested Secret */
const nestedSecret = { outer: { inner: "The Final Key" } };
const {
  outer: { inner: innerSecret },
} = nestedSecret;

console.log(`Secret: ${innerSecret}`);

/* Task 12: The Swap of Fate */
let stoneA = "Emerald";
let stoneB = "Ruby";

[stoneA, stoneB] = [stoneB, stoneA];
console.log(`StoneA: ${stoneA}\nStoneB: ${stoneB}`);
