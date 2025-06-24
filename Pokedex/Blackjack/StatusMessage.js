function StatusMessage({ score }) {
  return (
    <div className="status-message">
      <h1>Score: {score}</h1>
      {score === 21 && <h3>🎉🎉🎉BLACKJACK!!!🎉🎉🎉</h3>}
    </div>
  );
}
