/* Task 1: No Parameters: Activate Hyperdrive */
const activateHyperdrive = () => console.log("Hyperdrive activated!");
activateHyperdrive();

/* Task 2: Implicit Return: Scan for Lifeforms */
const scanForLife = () => console.log("No lifeforms detected");
scanForLife();

/* Task 3: Implicit Return with Objects: Log Coordinates */
const currentCoordinates = () => {
  return {
    x: 23.4,
    y: 15.2,
    z: 8,
  };
};

console.log(currentCoordinates());

/* Task 4: Understanding `this`: Message from Home Base */
const spacecraft = {
  receiveMessage: (message) => {
    return `Message received: ${this.message}`;
  },
};

console.log(spacecraft.receiveMessage("We come in peace"));
/*
 * Observations:
 * The arrow function is inheriting `this` from the window object and since the window object doesn't define message it returns undefined.
 */
