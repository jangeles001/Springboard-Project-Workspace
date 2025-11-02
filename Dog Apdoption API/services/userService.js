const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
  generateSalt,
  hashPassword,
  comparePassword,
} = require("../utils/hash");
const userRepo = require("../repositories/user");
const dogRepo = require("../repositories/dog");

dotenv.config();

async function registerUser(username, password) {
  const existingUser = await userRepo.findUserByUsername(username);
  if (existingUser) {
    throw new Error("USERNAME_ALREADY_EXISTS");
  }

  // Generates salt and hashed password
  const salt = await generateSalt();
  const hashedPassword = await hashPassword(password, salt);

  // Creates user
  const user = await userRepo.createUserDoc({ username, hashedPassword });

  // Creates JWT payload
  const payload = { sub: user.username };

  // Signs token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return { user, token };
}

async function validateUserCredentials(username, password) {
  // Searches for existing username
  const user = await userRepo.findUserByUsername(username);

  if (!user) throw new Error("INVALID_USERNAME_OR_PASSWORD");

  // Checks if password provided is correct/valid
  const validCredentials = await comparePassword(password, user.hashedPassword);

  if (!validCredentials) throw new Error("INVALID_USERNAME_OR_PASSWORD");

  // Creates JWT payload
  const payload = { sub: user.username };

  // Signs token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return { user, token };
}

async function getUserRegisteredDogs(
  username,
  page = 1,
  limit = 10,
  filter = "all"
) {
  // Retreives user with the provided username
  const user = await userRepo.findUserByUsername(username);
  if (!user) throw new Error("USER_NOT_FOUND");

  // Computes pagination indices
  const start = (page - 1) * limit;
  const end = page * limit;

  // Slices user adoptedDogs array at the pagination indices
  const dogUUIDsPage = user.registeredDogs.slice(start, end);

  // Retreives the informaiton for all of the users registerd dogs
  const paginatedDogs = await Promise.all(
    dogUUIDsPage.map(async (dogUUID) => {
      return dogRepo.findDogByUUID(dogUUID);
    })
  );

  // Applies filter if requested
  let filteredDogs = paginatedDogs;
  if (filter === "available") {
    filteredDogs = paginatedDogs.filter((dog) => dog.status === "available");
  } else if (filter === "adopted") {
    filteredDogs = paginatedDogs.filter((dog) => dog.status === "adopted");
  }

  return {
    page,
    limit,
    totalDogs: user.registeredDogs.length,
    totalPages: Math.ceil(user.registeredDogs.length / limit),
    dogs: filteredDogs,
  };
}

async function getUserAdoptedDogs(username, page = 1, limit = 10) {
  // Retreives user with the provided username
  const user = await userRepo.findUserByUsername(username);
  if (!user) throw new Error("USER_NOT_FOUND");

  // Computes pagination indices
  const start = (page - 1) * limit;
  const end = page * limit;

  // Slices user adoptedDogs array at the pagination indices
  const dogUUIDsPage = user.adoptedDogs.slice(start, end);

  // Retreives the informaiton for all of the users registerd dogs
  const paginatedDogs = await Promise.all(
    dogUUIDsPage.map(async (dogUUID) => {
      return dogRepo.findDogByUUID(dogUUID);
    })
  );

  return {
    page,
    limit,
    totalDogs: user.adoptedDogs.length,
    totalPages: Math.ceil(user.adoptedDogs.length / limit),
    dogs: paginatedDogs,
  };
}

module.exports = {
  registerUser,
  getUserRegisteredDogs,
  getUserAdoptedDogs,
  validateUserCredentials,
};
