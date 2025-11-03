const dogRepo = require("../repositories/dog");
const userRepo = require("../repositories/user");

async function getAllDogs() {
  const dogs = await dogRepo.findAllDogs();
  return { dogs }; // Return the list directly even if empty
}

async function getDogWithUUID(dogUUID) {
  const dog = await dogRepo.findDogByUUID(dogUUID);
  if (!dog) throw new Error(DOG_NOT_FOUND);

  return { dog };
}

async function registerDog(name, description, username) {
  const newDog = await dogRepo.createDog(name, description, username);
  await userRepo.addRegisteredDog(username, newDog.uuid);

  return { newDog };
}

async function adoptDog(dogUUID, username, adoptionMessage) {
  const dog = await dogRepo.findDogByUUID(dogUUID);
  if (!dog) throw new Error("DOG_NOT_FOUND");

  if (dog.owner === username || dog.status === "adopted")
    throw new Error("CANNOT_ADOPT_DOG_YOU_OWN_OR_IS_NOT_AVAILABLE");

  const previousOwner = dog.owner;
  await dogRepo.updateDogByUUID(dogUUID, {
    owner: username,
    status: "adopted",
  });

  const adoptionMessageWithDogName = {
    ...adoptionMessage,
    dogName: dog.name,
  };

  if (previousOwner) {
    await userRepo.addAdoptionMessage(
      previousOwner,
      adoptionMessageWithDogName
    );
  }

  await userRepo.addAdoptedDog(username, dog.uuid);

  return { owner: username, dogName: dog.name };
}

async function deleteDog(dogUUID, username) {
  // Gets the dog with the provided dogUUID from the db
  const dog = await dogRepo.findDogByUUID(dogUUID);
  if (!dog) throw new Error("DOG_NOT_FOUND"); // Throws error if dog is not found

  // Gets the user with the provided username from the database
  const user = await userRepo.findUserByUsername(username);

  // Throws error if the user is not the registered owner or if the dog has already been adopted
  if (!user.registeredDogs.includes(dogUUID) || dog.status === "adopted")
    throw new Error(
      "CANNOT_DELETE_DOG_YOU_DID_NOT_REGISTER_OR_THAT_HAS_BEEN_ADOPTED"
    );

  // Proceeds witht the deletion from the dogs collection and user registeredDogs list
  await dogRepo.deleteDogByUUID(dogUUID);
  await userRepo.removeRegisteredDog(username, dogUUID);

  return { dogName: dog.name, uuid: dog.uuid };
}

module.exports = {
  getAllDogs,
  getDogWithUUID,
  registerDog,
  adoptDog,
  deleteDog,
};
