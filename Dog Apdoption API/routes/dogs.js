const express = require("express");
const validate = require("../middlewares/schemaValidator");
const validateCredentials = require("../middlewares/authValidator");
const { newDogZodSchema } = require("../models/zodDogSchema");
const {
  allDogs,
  getDog,
  registerDogs,
  adopt,
  deleteDogs,
} = require("../controllers/dogsController");

const router = new express.Router();

router
  .get("/", validateCredentials, allDogs)
  .get("/:dog", validateCredentials, getDog)
  .post(
    "/register",
    validateCredentials,
    validate(newDogZodSchema),
    registerDogs
  )
  .post("/adopt/:dog", validateCredentials, adopt)
  .delete("/:dog", validateCredentials, deleteDogs);

module.exports = router;
