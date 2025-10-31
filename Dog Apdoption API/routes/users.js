const express = require("express");
const { createUser, getRegisteredDogs } = require("../repositories/users");
const validate = require("../validation/schemaValidator");
const { newUserZodSchema } = require("../models/zodUserSchema");
const validateCredentials = require("../validation/authValidator");

const router = express.Router();

router.get("/registeredDogs", validateCredentials, getRegisteredDogs);
router.post("/register", validate(newUserZodSchema), createUser);

module.exports = router;
