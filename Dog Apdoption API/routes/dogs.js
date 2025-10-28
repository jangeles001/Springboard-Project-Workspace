const express = require("express");
const { createDog, getAllDogs } = require("../models/dogs");

const router = new express.Router();

// GET / => {dogs: [dog, ...]}
router
.get("/", getAllDogs)
.get("/:dog", (req, res) => {
    return res.status(200).json({});
})
.post("/register", createDog)
.delete("/:dog", (req, res) => {
    return res.status(400).json({});
});




module.exports = router;