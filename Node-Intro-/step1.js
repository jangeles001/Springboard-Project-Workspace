const fs = require("fs").promises;
const process = require("process");

// Deafults path to the first argument passed through the command line
async function cat(path = process.argv[2]) {
  try {
    const data = await fs.readFile(path, "utf8");
    return data; // Returns promise to keep the function response uniform with other functions;
  } catch (error) {
    console.error(`Error reading ${path}: \n${error.message}`);
    process.exit(1);
  }
}
// Runs only if the file is executed directly
if (require.main === module) {
  (async () => {
    const data = await cat();
    console.log(data);
  })();
}

module.exports = { cat };
