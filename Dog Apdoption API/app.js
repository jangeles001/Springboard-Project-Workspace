const express = require("express");
const cors = require("cors");
const session = require("express-session")
const dotenv = require("dotenv");
const dogsRouter = require("./routes/dogs")
const connectDB = require("./db");

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

// Routes
app.use("/dogs", dogsRouter);
// app.use("/user",()=>{});

// Server start
async function startSever(){
  try{
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }catch(error){
    console.log(error);
  }
}

startSever();
