function InventoryItem({ name, type, quantity = 0, price = 0 }) {
  const stockThreshold = 5;
  const valueThreshold = 1000;

  const itemValue = price * quantity;

  return (
    <div>
      <h2>
        {name} ({type})
      </h2>
      {quantity < stockThreshold && (
        <Message>
          <span>⚠️</span> Low Stock! {quantity} remaining!
        </Message>
      )}
      {itemValue > valueThreshold && (
        <Message>
          <span>⚠️</span> High Value - consider extra protection!
        </Message>
      )}
    </div>
  );
}
