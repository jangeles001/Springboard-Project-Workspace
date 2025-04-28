const pokemonListURL = "https://pokeapi.co/api/v2/pokemon/";
let pokemonURLList = [];
let storedPokemon = [];

async function getPokemon(...pokemonStr) {
  let response = null;
  try {
    if (pokemonStr.length === 1) {
      response = await fetch(pokemonListURL + pokemonStr[1]).then((results) =>
        results.json()
      ); // checks if a specific pokemon is being requested
    } else {
      response = await fetch(pokemonListURL + "?limit=1302").then((results) =>
        results.json()
      ); // retruns the first 1302 pokemon in pokedex
    }
  } catch (error) {
    error.log("There was an error handling your request");
  }

  pokemonURLList = response.results;
}

async function getPokedexInfo() {
  let urlList = [];

  // requests information of 3 random pokemon
  for (let index = 0; index <= 2; index++) {
    let randomNumber = Math.floor(Math.random() * pokemonURLList.length); // generates random number from 1 to length of pokemon list
    let url = pokemonURLList.splice(randomNumber, 1)[0].url;
    urlList.push(url);
  }
  //accesses the pokemon info and then makes a call to that pokemons Pokedex entry
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

    //stores pokemon attributes in a local object and places it in an array
    storedPokemon.push({
      id: pokemon.id,
      name: pokeName,
      sprite: pokemon.sprites.front_default,
      flavor_text: entry.flavor_text,
    });
  });
}

async function displayPokemon() {
  //Iterates through storedPokemon and displayes them on the page.
  if (storedPokemon.length > 0) {
    const pokemon = storedPokemon.shift();

    const pokemonID = document.createElement("span");
    let id = document.querySelector("#pokedex-entry");
    pokemonID.textContent = "Pokemon#" + pokemon.id;
    id.textContent = pokemonID.textContent;

    document.querySelector("#pokemon-name").textContent = pokemon.name;

    // Create an image element
    let sectionTag = document.querySelector("#pokedex-info");
    const img = document.createElement("img");
    img.src = pokemon.sprite;
    img.alt = "image of pokemon";
    img.setAttribute("id", "ppimage");

    // Append the image to the section
    let imgTag = document.querySelector("#ppimage");
    if (imgTag) {
      // have to check if imgTag exists before we can call removeChild function
      sectionTag.removeChild(imgTag);
    }
    sectionTag.appendChild(img);

    //Displays flavor text fact
    let fact = document.querySelector("#fact");
    fact.setAttribute("style", "white-space:pre,");
    fact.textContent = pokemon.flavor_text;
    sectionTag.removeChild(fact); //fact tag is already created from the start so we can always call remove before appending next child
    sectionTag.appendChild(fact);
  } else {
    await getPokemon();
    await getPokedexInfo();
    await displayPokemon();
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await getPokemon(); //creates list of Pokemon
  await getPokedexInfo(); //generates array with pokemon information

  document
    .querySelector("#pokedex-button")
    .addEventListener("click", displayPokemon); //button functionality
});
