const { Dog } = require("../models/dogSchema");

// Finds all dogs in the collection
async function findAllDogs() {
  return await Dog.find();
}

// Finds dog with the provided dogUUID
async function findDogByUUID(dogUUID) {
  return await Dog.findOne({ uuid: dogUUID });
}

// Creates new dog document with the provided name, description, and owner
async function createDog(name, description, username) {
  return await Dog.create({ name, description, owner: username });
}

// Updates a dog with the provided dogUUID and updateData
async function updateDogByUUID(dogUUID, updateData) {
  return await Dog.findOneAndUpdate({ uuid: dogUUID }, updateData, {
    new: true,
  });
}

// Deletes dog with the provided dogUUID
async function deleteDogByUUID(dogUUID) {
  return await Dog.deleteOne({ uuid: dogUUID });
}

module.exports = {
  findAllDogs,
  findDogByUUID,
  createDog,
  updateDogByUUID,
  deleteDogByUUID,
};
