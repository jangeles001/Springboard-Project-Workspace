/* Task 1: Declare a Destination Variable */
let destination = "Ancient Egypt";
console.log(destination);

/* Task 2: Change the Destination */
destination = "Medieval Europe";
console.log(destination);

/* Task 3: Declare a Constant Travel Date */
const travelDate = "2024-03-15";
travelDate = "2024-04-15";
/*
 * Observations:
 * Since I cannot reassign the value of a const variable, An error is thrown.
 */

/* Task 4: Experiment with Variable Hoisting */
console.log(timeMachineModel);
var timeMachineModel = "T-800";
/*
 * Observations:
 * The timeMachineModel variable gets initialized at the start of the program without a value assigned to it. The console log then prints out undefined becuase the variable has not been assinged a value yet.
 */
