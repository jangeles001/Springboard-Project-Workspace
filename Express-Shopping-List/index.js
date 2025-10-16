const express = require("express");
const itemsRouter = require("./items/itemsRouter")

// Setup
const app = express();
const PORT = process.env.PORT || 5000;


// Routes
app.use(express.json());
app.use("/", itemsRouter);

// Error
app.use("/", (error, req, res, next) => {
    return res.status(500).send(`Error: ${error}`)
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));