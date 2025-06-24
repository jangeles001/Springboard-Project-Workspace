function Pokedex({ pokemonList }) {
  return (
    <div className="pokedex">
      {pokemonList.map((pokemon) => (
        <Pokecard
          key={pokemon.id}
          poke_id={pokemon.id}
          name={pokemon.name}
          type={pokemon.type}
          base_xp={pokemon.base_experience}
        ></Pokecard>
      ))}
    </div>
  );
}
