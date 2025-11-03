const express = require("express");
const {
  createUser,
  getRegisteredDogs,
  getAdoptedDogs,
  login,
} = require("../controllers/usersController");
const validate = require("../middlewares/schemaValidator");
const { userZodSchema } = require("../models/zodUserSchema");
const validateCredentials = require("../middlewares/authValidator");

const router = express.Router();

router
  .get("/dogs/registered", validateCredentials, getRegisteredDogs)
  .get("/dogs/adopted", validateCredentials, getAdoptedDogs)
  .post("/register", validate(userZodSchema), createUser)
  .post("/login", validate(userZodSchema), login);

module.exports = router;
