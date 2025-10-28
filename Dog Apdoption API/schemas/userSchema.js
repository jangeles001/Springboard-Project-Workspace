const mongoose = require("mongoose");
const {v4: uuidv4} = require ("uuid");

// Mongoose schema definition
const userSchema = new mongoose.Schema(
  {
    uuid: { type: String, default: uuidv4, unique: true, index: true },
    firstName: { type: String, minlength: 1, required: true, trim: true },
    username: { type: String, minlength: 4, required: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

// Generates Mongoose model
module.exports = mongoose.model("User", userSchema);
