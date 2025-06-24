function Table({ hand, handTotal }) {
  return (
    <div className="table">
      <div className="card-container">
        {hand.map((card) => (
          <Card
            key={`${card.suit} - ${card.rank}`}
            suit={card.suit[0]}
            rank={card.rank}
          ></Card>
        ))}
      </div>
      <StatusMessage score={handTotal}></StatusMessage>
    </div>
  );
}
