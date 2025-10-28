const mongoose = require("mongoose");
const {v4: uuidv4} = require ("uuid");

// Mongoose schema definition
const dogSchema = new mongoose.Schema(
  {
    uuid: { type: String, default: uuidv4, unique: true, index: true },
    name: { type: String, minlength: 1, required: true, trim: true },
    description: { type: String, minlength: 4, trim: true },
  },
  { timestamps: true }
);

// Generates Mongoose model
module.exports = mongoose.model("Dog", dogSchema);
