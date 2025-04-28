

const pokemonListURL = "https://pokeapi.co/api/v2/pokemon/";
let pokemonURLList =[];

async function getPokemon(...pokemonStr) {
    let response = null;
    try{
    if (pokemonStr.length  === 1) {
        response = await fetch(pokemonListURL + pokemonStr[1]).then(results => results.json()); // checks if a specific pokemon is being requested 
    } else {                    
        response = await fetch(pokemonListURL + "?limit=1302").then(results => results.json()); // retruns the first 1302 pokemon in pokedex
    }
    }catch(error){
        error.log("There was an error handling your request");
    }

    pokemonURLList = response.results;
}

async function getPokedexInfo(){
    let urlList = [];

    // requests information on 3 random pokemon
    for(let index = 0; index <= 2 ; index++){                                   
        let randomNumber = Math.floor(Math.random() * pokemonURLList.length);  // generates random number from 1 to length of pokemon list   
        let url = pokemonURLList.splice(randomNumber, 1)[0].url;
        urlList.push(url);     
    }
    let pokeDexInfo = await Promise.all(
        urlList.map(pokemonUrl => fetch(pokemonUrl).then(response => response.json()))      //accesses the pokemon info and then makes a call to that pokemons Pokedex entry
    ); 

    pokeDexInfo.forEach(pokemon => {
            console.log(`Pokemon: ${pokemon.name} #${pokemon.id}`);
            console.log(pokemon);
            console.log("\n");
        }
    )
    
}
document.addEventListener("DOMContentLoaded", async function(){
await getPokemon(); // creates list of Pokemon
        
document.querySelector("#pokedex-button").addEventListener('click', getPokedexInfo);  //button functionality
});

