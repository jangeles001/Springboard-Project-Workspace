const express = require("express");
const dotenv = require("dotenv");

// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

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

// Routes

// Server start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
