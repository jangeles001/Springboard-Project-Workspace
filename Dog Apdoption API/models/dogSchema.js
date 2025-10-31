const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Mongoose schema definition
const dogSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },
    name: { type: String, minlength: 1, required: true, trim: true },
    description: { type: String, minlength: 4, trim: true },
    status: {
      type: String,
      enum: ["available", "adopted"],
      default: "available",
      trim: true,
    },
    owner: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Generates Mongoose model
const Dog = mongoose.model("Dog", dogSchema);

module.exports = { Dog };
