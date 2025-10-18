const express = require("express");
const itemsRouter = require("./routes/items");
const { loadInventory, flushInventory } = require("./fakeDb");

// Setup
const app = express();
const PORT = process.env.PORT || 5000;
let flushInterval;

// Routes
app.use(express.json());
app.use("/", (req, res, next) => {
  next();
});
app.use("/items", itemsRouter);

// Error
app.use("/", (error, req, res, next) => {
  return res.status(500).send(`Error: ${error}`);
});

// Initializes process on startup
(async () => {
  await loadInventory(); // Initialize inventory

  // Starts periodic flush of inventory changes if data is "dirty"
  flushInterval = setInterval(flushInventory, 30000);

  process.on("SIGINT", async () => {
    clearInterval(flushInterval);
    await flushInventory();
    process.exit(0);
  });

  app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
})();
