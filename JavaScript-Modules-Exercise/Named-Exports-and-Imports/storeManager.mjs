import * as inventory from "./inventory.mjs";

inventory.addItem("Milk");
inventory.addItem("Eggs");
inventory.addItem("Bread");
inventory.addItem("Cheese");
inventory.addItem("Butter");

inventory.listItems();

inventory.removeItem("Milk");
inventory.removeItem("Cheese");

inventory.listItems();
