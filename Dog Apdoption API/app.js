const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const connectDB = require("./db");
const dogsRouter = require("./routes/dogs");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users");
const malformedJsonHandler = require("./middlewares/malformedJsonHandler");

// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());

// Routes
app.use("/dogs", dogsRouter);
app.use("/users", usersRouter);

// Catches malformed json data
app.use(malformedJsonHandler);

// Catches all for unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "NOT_FOUND",
    message: `The requested resource '${req.originalUrl}' was not found on this server.`,
  });
});

// Server start
async function startSever() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startSever();
