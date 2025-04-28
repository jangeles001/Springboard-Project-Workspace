

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

    console.log(response);
}

    document.addEventListener("DOMContentLoaded", async function(){
        await getPokemon(); // creates list of Pokemon
        
        document.querySelector("#pokedex-button").addEventListener('click', getPokemon);  //button functionality
    });

