const {
  getAllDogs,
  getDogWithUUID,
  registerDog,
  adoptDog,
  deleteDog,
} = require("../repositories/dogs");

async function allDogs(req, res) {
  try {
    // Returns all dogs in the collection
    const results = await getAllDogs();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function getDog(req, res) {
  try {
    // Returns dog with the uuid provided in the request.
    const results = await getDogWithUUID(req.params.dog);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function registerDogs(req, res) {
  try {
    // Destructures the name, description, uuid from the body of the request
    const { name, description } = req.body;
    const userUUID = req.user.sub;

    // Registers dog to collection and to the users registered dogs list
    const results = await registerDog(name, description, userUUID);

    // Returns the registered createdDog
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function adopt(req, res) {
  try {
    const dogUUID = req.params.dog;
    const { message } = req.body;
    const adoptionMessage = { dogUUID, message };
    const userUUID = req.user.sub;

    const results = await adoptDog(dogUUID, userUUID, adoptionMessage);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function deleteDogs(req, res) {
  try {
    // Pulls dogUUID from the request params and the userUUID from the request user object
    const dogUUID = req.params.dog;
    const userUUID = req.user.sub;

    // Deletes dog from dog collection and userRegistered dogs list
    const results = await deleteDog(dogUUID, userUUID);

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = { allDogs, getDog, registerDogs, adopt, deleteDogs };
