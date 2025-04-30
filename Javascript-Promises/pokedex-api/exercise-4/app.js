const pokemonListURL = "https://pokeapi.co/api/v2/pokemon/";
let pokemonURLList = [];
let storedPokemon = [];

async function getPokemon(...pokemonStr) {
  let response = null;
  try {
    if (pokemonStr.length === 1) {
      response = await fetch(pokemonListURL + pokemonStr[1]).then((results) =>
        results.json()
      ); // Checks if a specific pokemon is being requested
    } else {
      response = await fetch(pokemonListURL + "?limit=1302").then((results) =>
        results.json()
      ); // Returns the first 1302 pokemon in pokedex
    }
  } catch (error) {
    error.log("There was an error handling your request");
  }

  pokemonURLList = response.results;
}

async function getPokedexInfo() {
  let urlList = [];

  //Requests information of 3 random pokemon
  for (let index = 0; index <= 2; index++) {
    let randomNumber = Math.floor(Math.random() * pokemonURLList.length); // generates random number from 1 to length of pokemon list
    let url = pokemonURLList.splice(randomNumber, 1)[0].url;
    urlList.push(url);
  }
  //Accesses the pokemon info and then makes a call to that pokemons Pokedex entry
  let pokeDexInfo = await Promise.all(
    urlList.map((pokemonUrl) =>
      fetch(pokemonUrl).then((response) => response.json())
    )
  );

  //Iterates pokeDexInfo and looks for a flavor_text_entries
  pokeDexInfo.forEach(async (pokemon) => {
    let pokeName = pokemon.species.name;
    let speciesInfo = await axios.get(pokemon.species.url);
    let randomNumber = Math.floor(
      Math.random() * speciesInfo.data.flavor_text_entries.length
    );
    let entry = await speciesInfo.data.flavor_text_entries[randomNumber];
    let language = await entry.language.name;
    while (language !== "en") {
      randomNumber = Math.floor(
        Math.random() * speciesInfo.data.flavor_text_entries.length
      );
      entry = speciesInfo.data.flavor_text_entries[randomNumber];
      language = entry.language.name;
    }
    //Resets button text
    document.querySelector("#pokedex-button").textContent =
      "Get Pokedex Entry!";

    //Stores pokemon attributes in a local object and places it in an array
    storedPokemon.push({
      id: pokemon.id,
      name: pokeName,
      sprite: pokemon.sprites.front_default,
      flavor_text: entry.flavor_text,
    });
  });
}

async function displayPokemon() {
  //Stored reference to button and content
  const contentSection = document.querySelector("#content");
  const button = document.querySelector("#pokedex-button");

  //Checks for storedPokemon and displayes them on the page when function is called.
  if (storedPokemon.length > 0) {
    const pokemon = storedPokemon.shift(); //Grabs stored pokemon information

    //Creates new elements
    const newPokemon = document.createElement("div"); //Entire div
    const entryNumber = document.createElement("h3"); //PokeDex Entry Number
    const pokeName = document.createElement("h4"); //Pokemon Name
    const pokeImg = document.createElement("img"); //PokeDex Image
    const pokeFact = document.createElement("p"); //Flavor_Text

    //Creates new section for the current pokedex entry and sets attribute
    newPokemon.classList.add(`pokemon-card`);
    pokeFact.classList.add("poke-fact");
    pokeImg.style.display = "flex";
    pokeImg.style.alignContent = "Center";

    //Sets the content for each newly created tag
    entryNumber.textContent = `Pokedex Entry #${pokemon.id}`;
    pokeName.textContent = pokemon.name;
    pokeImg.src = pokemon.sprite;
    pokeImg.alt = "image of pokemon";
    pokeFact.textContent = pokemon.flavor_text;

    //Appends children to new div then appends the new div to the content div
    newPokemon.appendChild(entryNumber);
    newPokemon.appendChild(pokeName);
    newPokemon.appendChild(pokeImg);
    newPokemon.appendChild(pokeFact);
    contentSection.appendChild(newPokemon);
  } else {
    //Removes all previously created children
    while (contentSection.firstChild) {
      contentSection.removeChild(contentSection.firstChild);
    }
    await getPokemon();
    await getPokedexInfo();
  }
  //Renames button to clear when stored pokemon is empty
  if (storedPokemon.length === 0) {
    button.textContent = "Clear";
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await getPokemon(); //creates list of Pokemon
  await getPokedexInfo(); //generates array with pokemon information

  document
    .querySelector("#pokedex-button")
    .addEventListener("click", displayPokemon); //button functionality
});
