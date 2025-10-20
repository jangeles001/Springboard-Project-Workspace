/** Database config for database. */
const { Client } = require("pg");
const { DB_URI } = require("./config");

let db = new Client({
  connectionString: DB_URI,
});

async function connectDB() {
  await db.connect();
  console.log(DB_URI);
}

module.exports = { db, connectDB };
