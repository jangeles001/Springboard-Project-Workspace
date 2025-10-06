const fs = require("fs").promises;
const process = require("process");
const { cat } = require("./step1");
const { webCat } = require("./step2");

// Deafults path to the first argument passed through the command line
async function webCatWrite(args = process.argv) {
  let response = null;

  // Checks if --out flag is present
  if (args[2] === "--out") {
    const readPath = args[4];
    const writePath = args[3];
    if (readPath.startsWith("http")) {
      response = await webCat(readPath);
    } else {
      response = await cat(readPath);
    }
    // Tries to write to file path provided
    try {
      await fs.writeFile(writePath, response);
      return `no output, but ${writePath} contains ${readPath} HTML`; // Success message
    } catch (error) {
      return error.message; // Error message
    }
  } else {
    // Runs other functions if --out flag is not present
    let index = 2;
    while (index < args.length) {
      const readPath = args[index];
      if (readPath.startsWith("http")) {
        const data = await webCat(readPath);
        console.log(data);
      } else {
        const data = await cat(readPath);
        console.log(data);
      }
      index++;
    }
  }
  process.exit(1);
}
// Runs only if the file is executed directly
if (require.main === module) {
  (async () => {
    const data = await webCatWrite();
    console.log(data);
  })();
}

module.exports = { webCatWrite };
