/** Command-line tool to generate Markov text.*/
const fs = require("fs").promises;
const axios = require("axios");
const process = require("process");
const MarkovMachine = require("./markov");

async function makeText(type = process.argv[2], path = process.argv[3]) {
  let data = null;
  switch (type) {
    case "url":
      try {
        response = await axios.get(path);
        data = response.data;
      } catch (error) {
        console.log(`Failed to fetch data from URL ${path}`);
        return error.message;
      }
      break;
    case "file":
      try {
        data = await fs.readFile(path, "utf8");
      } catch (error) {
        console.log(`Failed to read data from file ${path}`);
        return error.message;
      }
      break;
  }
  const mm = new MarkovMachine(data);
  const text = mm.makeText();
  return `... generated text from file ${path} ... \n${text}`;
}

// Runs only if the file is executed directly
if (require.main === module) {
  (async () => {
    const data = await makeText();
    console.log(data);
  })();
}
