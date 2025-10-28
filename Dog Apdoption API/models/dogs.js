const Dog = require("../schemas/dogSchema");

async function getAllDogs(req, res){
    const dogs = await Dog.find();
    return res.status(200).json(dogs);
}

async function createDog(req, res){
try {
    const { name, description } = req.body;

    // Creates and captures the new dog document
    const newDog = await Dog.create({ name, description });

    // Returns the created document
    return res.status(201).json(newDog);
  } catch (err) {
    console.error("Error creating dog:", err);
    return res.status(500).json({ error: "Failed to create dog" });
  }
}

module.exports = { createDog, getAllDogs };