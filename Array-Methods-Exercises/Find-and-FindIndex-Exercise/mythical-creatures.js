const mythicalCreatures = [
  { name: "Dragon", type: "Fire", lastSeen: "Volcano Valley" },
  { name: "Mermaid", type: "Water", lastSeen: "Coral Caves" },
  { name: "Unicorn", type: "Land", lastSeen: "Enchanted Forest" },
  { name: "Griffin", type: "Air", lastSeen: "Highwind Mountains" },
  { name: "Kraken", type: "Water", lastSeen: "Abyssal Depths" },
];

const creature = mythicalCreatures.find((value, index) => {
  return value.type === "Water" ? value : undefined;
});

const griffin = mythicalCreatures.findIndex((value) => {
  return value.name === "Griffin" ? value : undefined;
});

const enchantdForestCreature = mythicalCreatures.find((value, index) => {
  return value.lastSeen === "Enchanted Forest" ? value : undefined;
});

console.log(creature);
console.log(`Index of Griffin: ${griffin}`);
console.log(
  `First Creature Seen in Enchanted Forest: ${enchantdForestCreature.name}`
);
