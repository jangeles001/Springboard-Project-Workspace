export const inventory = [];

export function addItem(itemName) {
  inventory.push(itemName);
  console.log(`${itemName} has been added to inventory!`);
}

export function removeItem(itemName) {
  const indexOfElement = inventory.findIndex((value) => {
    return value === itemName;
  });
  if (indexOfElement > -1) {
    inventory.splice(indexOfElement, 1);
    console.log(`${itemName} has been removed!`);
  } else {
    console.log(`${itemName} doesn't exist!`);
  }
}

export function listItems() {
  console.log("All items in inventory:");
  for (const item of inventory) {
    console.log(item);
  }
  console.log("\n");
}
