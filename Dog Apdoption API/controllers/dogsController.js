const {
  getAllDogs,
  getDogWithUUID,
  registerDog,
  adoptDog,
  deleteDog,
} = require("../services/dogService");

// GET  dogs/ => {allDogs: [dog, ...]}
async function allDogs(req, res) {
  try {
    // Returns all dogs in the collection
    const results = await getAllDogs();
    return res.status(200).json({ allDogs: results.dogs });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// GET  dogs/:dog => {dog: dog}
async function getDog(req, res) {
  try {
    // Returns dog with the uuid provided in the request.
    const results = await getDogWithUUID(req.params.dog);
    return res.status(200).json(results.dog);
  } catch (error) {
    if (error.message === "DOG_NOT_FOUND")
      return res.status(404).json(error.messsage);

    return res.status(500).json({ error: error.message });
  }
}

// POST  dogs/register => {message: newDogName (UUID: newDogUUID) registered successfully!}
async function registerDogs(req, res) {
  try {
    // Destructures the name, description, uuid from the body of the request
    const { name, description } = req.body;
    const userUUID = req.user.sub;

    // Registers dog to collection and to the users registered dogs list
    const results = await registerDog(name, description, userUUID);

    return res.status(201).json({
      message: `${results.newDog.name} (UUID: ${results.newDog.uuid}) successfully registered!`,
      dogUUID: results.newDog.uuid,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

// POST  /adpot/:dog => { message: `dogOwner successfully adopted dogName`}
async function adopt(req, res) {
  try {
    const dogUUID = req.params.dog;
    const { message } = req.body;
    const adoptionMessage = { dogUUID, message };
    const username = req.user.sub;

    const results = await adoptDog(dogUUID, username, adoptionMessage);
    return res.status(200).json({
      message: `${results.owner} successfully adopted ${results.dogName}`,
    });
  } catch (error) {
    if (error.message === "DOG_NOT_FOUND")
      return res.status(404).json({ error: error.message });

    if (error.message === "CANNOT_ADOPT_DOG_YOU_OWN_OR_IS_NOT_AVAILABLE")
      return res.status(401).json({ error: error.message });

    return res.status(500).json({ error: error.message });
  }
}

// DELETE  dogs/:dog => {message: `dogName (UUID: dogUUID) has been unregistered`}
async function deleteDogs(req, res) {
  try {
    // Pulls dogUUID from the request params and the userUUID from the request user object
    const dogUUID = req.params.dog;
    const username = req.user.sub;

    // Deletes dog from dog collection and userRegistered dogs list
    const results = await deleteDog(dogUUID, username);

    return res.status(200).json({
      message: `${results.dogName} (UUID: ${results.uuid}) has been unregistered`,
    });
  } catch (error) {
    if (error.message === "DOG_NOT_FOUND")
      return res.status(404).json({ error: error.message });

    if (
      error.message ===
      "CANNOT_DELETE_DOG_YOU_DID_NOT_REGISTER_OR_THAT_HAS_BEEN_ADOPTED"
    )
      return res.status(401).json({ error: error.message });

    return res.status(500).json(error);
  }
}

module.exports = { allDogs, getDog, registerDogs, adopt, deleteDogs };
