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
  // Fetch user document first
  const user = await userRepo.findUserByUsername(username);

  // Saftey check but redundant since user authorization is required before request is processed
  if (!user) throw new Error("USER_NOT_FOUND");

  // Finds and filters registeredDogs
  const { dogs, totalDogs } = await dogRepo.findDogsByUUIDs(
    user.registeredDogs,
    filter,
    page,
    limit
  );

  return {
    page,
    limit,
    totalDogs,
    totalPages: Math.ceil(totalDogs / limit),
    dogs,
  };
}

async function getUserAdoptedDogs(username, page = 1, limit = 10) {
  // Retreives user with the provided username
  const user = await userRepo.findUserByUsername(username);
  if (!user) throw new Error("USER_NOT_FOUND");

  // Finds and filters adoptedDogs
  const { dogs, totalDogs } = await dogRepo.findDogsByUUIDs(
    user.adoptedDogs,
    "all",
    page,
    limit
  );

  return {
    page,
    limit,
    totalDogs,
    totalPages: Math.ceil(totalDogs / limit),
    dogs,
  };
}

module.exports = {
  registerUser,
  getUserRegisteredDogs,
  getUserAdoptedDogs,
  validateUserCredentials,
};
