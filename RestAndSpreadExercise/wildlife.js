/* Task 1: Track Animal Sightings */
function animalSightings(...animals) {
  animals.forEach((animal) => {
    console.log(`${animal}`);
  });
}

animalSightings("Lion", "Dolphin", "Flaminco", "Bear");

/* Task 2: Merge Habitat Areas */
const forestHabitats = ["Forest A", "Forest B"];
const savannahHabitats = ["Savannah C", "Savannah D"];
const comprehensiveHabitats = [...forestHabitats, ...savannahHabitats];

console.log(comprehensiveHabitats);

/* Task 3: Update Conservation Status */
const rhinoStatus = {
  population: 500,
  status: "Endangered",
};

const newRhinoStatus = {
  ...rhinoStatus,
  population: 550,
  habitat: "African Grassland",
};

console.log(newRhinoStatus);

/* Task 4: Catalog Genetic Diversity */
const lionProfile = {
  name: "Leo",
  age: 5,
  species: "Lion",
};
// TODO: Duplicate an animal profile object using a shallow copy. Add genetic diversity information using the `genetics` property to this copy. Observe and explain how changes to nested properties affect both the original and the copied object.
const duplicateLionProfile = { ...lionProfile };

duplicateLionProfile.genetics = { diversityScore: 0.89, strength: 10 };
duplicateLionProfile.genetics.strength = 9;

console.log(lionProfile);
console.log(duplicateLionProfile);
/*
 * Observations:
 * The original lionprofile object is preserved after the copy is created and only the new object contains the genetics property.
 */

/* Task 5: Analyze Ecosystem Health */
const ecosystemHealth = {
  waterQuality: "Good",
  foodSupply: {
    herbivores: "Abundant",
    carnivores: "Sufficient",
  },
};
const updatedWaterQuality = {
  ...ecosystemHealth,
};

updatedWaterQuality.foodSupply.carnivores = "Insufficient";

console.log(ecosystemHealth);
console.log(updatedWaterQuality);
/*
 * Observations:
 * Since the copy is a shallow copy, the object copy contains only a refrencing of the origianl nested object in ecosystemHealth. Any changes made to the copy will also
 * be reflected by the original object.
 */
