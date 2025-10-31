const { Dog } = require("../models/dogSchema");
const { User } = require("../models/userSchema");

async function getAllDogs() {
  try {
    // Finds all dogs in the collection
    const dogs = await Dog.find();

    return { Dogs: dogs };
  } catch (error) {
    return error;
  }
}

async function getDogWithUUID(dogUUID) {
  try {
    // Finds dog with the provided dogUUID
    const dog = await Dog.findOne({ uuid: dogUUID });

    if (!dog) return { message: `Dog with UUID:${dogUUID} not found!` };

    return { Dog: dog };
  } catch (error) {
    return error;
  }
}

async function registerDog(name, description, userUUID) {
  try {
    // Creates and captures the new dog document
    const newDog = await Dog.create({ name, description, owner: userUUID });

    // Finds the user based on the UUID, adds the new dog to their registered list, and saves the addition to the db.
    await User.findOneAndUpdate(
      { uuid: userUUID }, // find the user
      { $addToSet: { registeredDogs: newDog.uuid } } // push into array if not duplicates
    );

    // Returns the created document
    return {
      message: `Dog ${newDog.name} (UUID:${newDog.uuid}) created successfully!`,
    };
  } catch (err) {
    return { error: "Failed to create dog" };
  }
}

async function adoptDog(dogUUID, userUUID, adoptionMessage) {
  try {
    const dog = await Dog.findOne({ uuid: dogUUID });

    if (!dog) return { error: "Dog doesn't exist!" };

    if (dog.owner === userUUID)
      return { error: "Cannot adopt a dog you already own!" };

    await Dog.findOneAndUpdate(
      { uuid: dogUUID }, // Finds the dog
      { $set: { owner: userUUID } } // Pushes into array if not a duplicate
    );

    const adoptionMessageWithDogName = {
      ...adoptionMessage,
      dogName: dog.name,
    };

    await User.findOneAndUpdate(
      { uuid: dog.owner }, // Finds the previous owner
      { $addToSet: { adoptionMessages: { ...adoptionMessageWithDogName } } } // Pushes adoptionMessasge into array assuming not a duplicate
    );

    await User.findOneAndUpdate(
      { uuid: userUUID }, // Finds the new owner
      { $addToSet: { adoptedDogs: dog.uuid } } // Pushes into array if not a duplicate
    );

    return {
      message: `You have successfully adopted ${dog.name} (UUID: ${dog.uuid})`,
    };
  } catch (error) {
    return error;
  }
}

async function deleteDog(dogUUID, userUUID) {
  try {
    // Finds dog and deletes from collection
    const dogInformation = await Dog.findOne({ uuid: dogUUID });
    const results = await Dog.deleteOne({ uuid: dogUUID });

    if (!results) {
      return { error: `Dog with UUID: ${dogUUID} not found!` };
    }

    // Finds and deletes dogUUID from the users list registeredDogs
    await User.findOneAndUpdate(
      { uuid: userUUID }, // Finds the user
      {
        $pull: {
          registeredDogs: dogUUID, // Pulls dog UUID from both registeredDogs and adoptedDogs
          adoptedDogs: dogUUID,
        },
      }
    );

    return {
      message: `${dogInformation.name} (UUID:${dogInformation.uuid}) deleted successfully!`,
    };
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllDogs,
  getDogWithUUID,
  registerDog,
  adoptDog,
  deleteDog,
};
