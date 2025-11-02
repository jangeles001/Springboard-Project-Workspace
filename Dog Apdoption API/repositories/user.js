const { User } = require("../models/userSchema");

// Creates user
async function createUserDoc(userData) {
  return await User.create(userData);
}

// Finds user by username
async function findUserByUsername(username) {
  return await User.findOne({ username });
}

// Adds a dog with the provided dogUUID to the registeredDogs list of the user with the provided userUUID
async function addRegisteredDog(username, dogUUID) {
  return await User.findOneAndUpdate(
    { username: username },
    { $addToSet: { registeredDogs: dogUUID } },
    { new: true }
  );
}

// Adds provided message to the adoptionMessages list of the user with the provided userUUID
async function addAdoptionMessage(username, message) {
  return await User.findOneAndUpdate(
    { username: username },
    { $addToSet: { adoptionMessages: message } },
    { new: true }
  );
}

// Adds the provided dogUUID to the adoptedDogs list of the user with the provided userUUID
async function addAdoptedDog(username, dogUUID) {
  return await User.findOneAndUpdate(
    { username: username },
    { $addToSet: { adoptedDogs: dogUUID } },
    { new: true }
  );
}

// Updates user (generic)
async function updateUser(filter, update) {
  return await User.findOneAndUpdate(filter, update, { new: true });
}

// Removes the provided dogUUID from the registeredDogs list of the user witht he provided userUUID
async function removeRegisteredDog(username, dogUUID) {
  return User.findOneAndUpdate(
    { username: username },
    { $pull: { registeredDogs: dogUUID } },
    { new: true }
  );
}

module.exports = {
  createUserDoc,
  findUserByUsername,
  addRegisteredDog,
  addAdoptionMessage,
  addAdoptedDog,
  removeRegisteredDog,
};
