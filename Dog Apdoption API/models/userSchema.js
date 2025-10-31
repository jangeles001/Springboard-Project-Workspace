const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Mongoose schema definition
const userSchema = new mongoose.Schema(
  {
    uuid: { type: String, default: uuidv4, unique: true, index: true },
    username: { type: String, minlength: 4, required: true, trim: true },
    hashedPassword: { type: String, minLength: 6, required: true },
    adoptedDogs: { type: [String], default: [] },
    registeredDogs: { type: [String], default: [] },
    adoptionMessages: {
      type: [
        {
          dogName: { type: String, required: true },
          dogUUID: { type: String, required: true },
          message: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

// Generates Mongoose model
const User = mongoose.model("User", userSchema);

module.exports = { User };
