const fs = require("fs");
// Follow along the [NodeJS Basics] instructional video //
// If any of the code is failing or you get stuck, take a look at the finished example in [./finish] directory

// 1. Using [createReadStream] method in the [fs] module
// read the large [blog3.txt] file and output the result to the console
const readStream = fs.createReadStream("./docs/blog3.txt", {
  encoding: "utf8",
});

// readStream.on("data", (chunk) => {
//   console.log("----- New Chunk -----");
//   console.log(chunk);
// });

// 2. Using the [createReadStream] and [createWriteStream] methods in  the [fs] module
// read from the large [blog3.txt] file and write to [blog4.txt] file
const writeStream = fs.createWriteStream("./docs/blog4.txt");

// readStream.on("data", (chunk) => {
//   writeStream.write(`\nNEW CHUNK\n`);
//   writeStream.write(chunk);
// });

// 3. Using the [pipe] method as part of the [readStream], 'pipe' the data to a [blog5.txt] file
readStream.pipe(writeStream);
