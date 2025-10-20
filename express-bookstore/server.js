/** Server for bookstore. */
const app = require("./app");
const { connectDB } = require("./db");

async function startServer() {
  try {
    await connectDB(); // ensure DB is connected first
    app.listen(3000, () => {
      console.log("Server starting on port 3000");
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
}

startServer();
