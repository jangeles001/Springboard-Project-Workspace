const fs = require("fs").promises;
const path = require("path");

const INVENTORY_PATH = path.join(__dirname, "inventory.json");
let inventory = [];
let dirty = false;
let flushInterval = null;

function setDirty() {
  dirty = true;
}

async function loadInventory() {
  const raw = await fs.readFile(INVENTORY_PATH, "utf-8");
  const data = JSON.parse(raw);
  inventory = data.items || [];
}

async function flushInventory() {
  if (!dirty) return; // Returns if no changes to the inventory have been made

  // Rests dirty flag then writes to db
  dirty = false;
  await fs.writeFile(
    INVENTORY_PATH,
    JSON.stringify({ items: inventory }, null, 2)
  );
}

function getInventory() {
  return inventory;
}

module.exports = {
  loadInventory,
  getInventory,
  flushInventory,
  setDirty,
};
