function Pokecard({ poke_id, name, type, base_xp }) {
  return (
    <div className={`pokecard type-${type}`}>
      <h1>{name}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke_id}.png`}
      ></img>
      <h2>{type}</h2>
      <h3>EXP: {base_xp}</h3>
    </div>
  );
}
