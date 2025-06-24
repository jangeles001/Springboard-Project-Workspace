function Pokedex({ pokemonList, handName, handXp, isWinner }) {
  return (
    <div>
      <div className="pokedex">
        {pokemonList.map((pokemon) => (
          <Pokecard
            key={`${pokemon.id} - ${handName} `}
            poke_id={pokemon.id}
            name={pokemon.name}
            type={pokemon.type}
            base_xp={pokemon.base_experience}
          ></Pokecard>
        ))}
        <div className="status-message">
          <h1>
            {isWinner === true ? `${handName} Wins!` : `${handName} Loses!`}
          </h1>
          <p>{`Total Hand XP: ${handXp}`}</p>
        </div>
      </div>
    </div>
  );
}
