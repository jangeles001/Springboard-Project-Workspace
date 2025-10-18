const { getInventory, setDirty } = require("../fakeDb.js");

const getAllInventoryItems = (req, res) => {
  const inventory = getInventory();
  return res.status(200).json(inventory);
};

const createNewInventoryItem = (req, res, next) => {
  const inventory = getInventory();
  const { name, price } = req.body;

  if (!name || !price) next();

  const exists = inventory.some((item) => item.name === name);
  if (exists) {
    return res.status(400).json({ error: "Item already exists" });
  }
  inventory.push({ name, price });
  setDirty();
  return res.status(201).json({ added: { name, price } });
};

const getItem = (req, res) => {
  const inventory = getInventory();
  const item = inventory.find((item) => {
    return item.name === req.params.item;
  });

  if (item) {
    return res.status(200).json(item);
  }

  return res.status(404).json({ Error: "item not Found" });
};

const updateInventoryItem = (req, res) => {
  const inventory = getInventory();
  const { name, price } = req.body;
  const item = inventory.find((item) => {
    return item.name === req.params.item;
  });

  if (item) {
    item.name = name;
    item.price = price;
    setDirty();
    return res.status(200).json({ updated: item });
  }

  return res.status(404).json({ Error: "item not Found" });
};

const removeInventoryItem = (req, res) => {
  const inventory = getInventory();
  let index = inventory.findIndex((item) => item.name === req.params.item);

  if (index >= 0) {
    inventory.splice(index, 1);
    setDirty();
    return res.status(200).json("Deleted");
  }

  return res.status(204).json("Item not found");
};

module.exports = {
  getAllInventoryItems,
  createNewInventoryItem,
  getItem,
  updateInventoryItem,
  removeInventoryItem,
};
