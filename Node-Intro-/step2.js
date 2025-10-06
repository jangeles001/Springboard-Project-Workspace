const axios = require("axios");
const process = require("process");
const { cat } = require("./step1");

// Deafults path to the first argument passed through the command line
async function webCat(URL = process.argv[2]) {
  if (URL.startsWith("http")) {
    // Checks if URL is passed to function
    try {
      const response = await axios.get(URL);
      return response.data; // Returns URL HTML promise
    } catch (error) {
      console.error(`Error fetching: ${URL} \n${error.message}`);
      process.exit(1);
    }
  } else {
    return await cat(URL); // Returns file promise
  }
}

// Runs only if the file is executed directly
if (require.main === module) {
  (async () => {
    const data = await webCat();
    console.log(data);
  })();
}

module.exports = { webCat };
