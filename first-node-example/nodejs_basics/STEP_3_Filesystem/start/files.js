const fs = require("fs");

// Follow along the [NodeJS Basics] instructional video //
// If any of the code is failing or you get stuck, take a look at the finished example in [./finish] directory

// 1. Using the [fs] module read the [blog1.txt] file
fs.readFile("./docs/blog1.txt", (err, data) => {
  if (err) console.log(err);

  console.log(data.toString());
});

console.log("last line");

// 2. Using the [fs] module's [writeFile] method, overwrite the data in [blog1.txt] file
fs.writeFile("./docs/blog1.txt", "hello, world", () => {
  console.log("file was written");
});

// 3. Using the [fs] module's [writeFile] method, make a new [blog2.txt] file
fs.writeFile("./docs/blog2.txt", "hello, again", () => {
  console.log("file was written");
});

// 4. Using the [fs] module's [mkdir] [rmdir] and [existsSync] methods, conditionally create and delete a directory
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) console.log(err);

    console.log("folder created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) console.log(err);

    console.log("folder deleted");
  });
}

//deleting files
if (fs.existsSync("./docs/deletme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) console.log(err);

    console.log("file deleted");
  });
}
