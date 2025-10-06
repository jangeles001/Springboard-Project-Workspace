const os = require("os");
const { people, ages } = require("./people");

// Follow along the [NodeJS Basics] instructional video //
// If any of the code is failing or you get stuck, take a look at the finished example in [./finish] directory
// 1. Add information to the [people.js] module,
// 2. Import the data here so that the current module can acces it
// 3. use the [os] module to print out information about your local machine

// console.log(people, ages); // Empty object unless something is exported in people file.
// console.log(os);
console.log(os.platform(), os.homedir());
// console.log("Hello World!");
