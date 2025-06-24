function Card({ suit, rank }) {
  return (
    <div className={`card`}>
      <img
        src={`https://deckofcardsapi.com/static/img/${rank}${suit.toUpperCase()}.png`}
      ></img>
    </div>
  );
}
