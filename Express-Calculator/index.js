const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/mean", (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).send({ error: "nums query parameter is required!" });
  }

  const numbers = nums.split(",").map(Number);
  const mean = Math.round(numbers.reduce((a, b) => a + b, 0) / nums.length);
  return res.json({ operation: "mean", mean });
});

app.get("/median", (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).send({ error: "nums query parameter is required!" });
  }

  const numbers = nums.split(",").map(Number);
  const median = Math.floor(numbers.length / 2);
  return res.json({ operation: "median", median: numbers[median] });
});

app.get("/mode", (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).send({ error: "nums query parameter is required!" });
  }

  const numbers = nums.split(",").map(Number);
  const freqTable = new Map();
  let mostFrequentNumber = numbers[0];

  numbers.forEach((number) => {
    if (freqTable.has(number)) {
      freqTable.set(number, freqTable.get(number) + 1);
    } else {
      freqTable.set(number, 1);
    }

    if (freqTable.get(number) > freqTable.get(mostFrequentNumber)) {
      mostFrequentNumber = number;
    }
  });

  return res.status(400).json({ operation: "mode", mode: mostFrequentNumber });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
