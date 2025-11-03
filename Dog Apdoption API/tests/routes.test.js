process.env.NODE_ENV = "test";

const chai = require("chai");
const dotenv = require("dotenv");
const axios = require("axios");
const mongoose = require("mongoose");
const { Dog } = require("../models/dogSchema");
const { User } = require("../models/userSchema");
const { userA, userB } = require("./helpers/axiosClients.js");
const { registerUser } = require("../services/userService.js");
const { registerDog } = require("../services/dogService.js");
const expect = chai.expect;
dotenv.config();

const BASE_URL = `http://localhost:${process.env.PORT}`;

let testUserA;
let testDogA;

describe(" Test cases for Routes", function () {
  before(async function () {
    await mongoose.connect(process.env.MONGO_TEST_URI);
  });

  // Clears all users and dogs from the db before each test.
  beforeEach(async () => {
    await User.deleteMany({});
    await Dog.deleteMany({});

    // Creates a user to pass auth check before each test
    const { user, token } = await registerUser("User1", "abc123");
    const { newDog } = await registerDog(
      "Rufus",
      "Ugh.. Ugh.. Barks a lot",
      "User1"
    );

    await userA.jar.setCookie(`token=${token}`, BASE_URL);

    testUserA = user;
    testDogA = newDog;
  });

  after(async function () {
    await mongoose.connection.close();
  });

  it("POST users/register should register a new user and set a cookie", async () => {
    // Deletes testUser to properly check if user creation and validation work.
    await User.deleteMany({});

    // Deletes all cookies from the jar before sending post request
    userA.jar.removeAllCookiesSync();

    const response = await userA.client.post(`${BASE_URL}/users/register`, {
      username: "User1",
      password: "abc123",
    });
    expect(response.status).to.equal(201);
    expect(response.data.message).to.include("User1");

    // Gets cookies from the cookie jar and checks if the token exists in the stored cookie.
    const cookies = await userA.jar.getCookies(BASE_URL);
    const tokenCookie = cookies.find((cookie) => cookie.key === "token");
    expect(tokenCookie).to.exist;
  });

  it("POST users/register should return 409 status user already exists", async () => {
    const response = await userA.client.post(
      `${BASE_URL}/users/register`,
      { username: "User1", password: "abc123" },
      { validateStatus: () => true }
    );
    expect(response.status).to.equal(409);
    expect(response.data.error).to.equal("USERNAME_ALREADY_EXISTS");
  });

  it("POST users/register should return 400 Bad Request for malformed JSON input", async () => {
    const response = await userA.client.post(
      `${BASE_URL}/users/register`,
      "{ username: 'InvalidJson' ", // invalid json missing closing brace
      {
        headers: { "Content-Type": "application/json" },
        validateStatus: () => true,
      }
    );
    expect(response.status).to.equal(400);
    expect(response.data.error).to.equal("Malformed JSON");
  });

  it("POST users/login should return auth token and login message", async () => {
    // Deletes all cookies from the jar before sending post request
    userA.jar.removeAllCookiesSync();

    const response = await userA.client.post(`${BASE_URL}/users/login`, {
      username: "User1",
      password: "abc123",
    });

    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal(`${testUserA.username} logged in!`);

    // Gets jwt cookie from the client jar
    const cookies = await userA.jar.getCookies(BASE_URL);
    const tokenCookie = cookies.find((cookie) => cookie.key === "token");
    expect(tokenCookie).to.exist;
  });

  it("POST users/login should return 404 error and user not found", async () => {
    // Deletes all cookies from the jar before sending post request
    userA.jar.removeAllCookiesSync();

    const response = await userA.client.post(
      `${BASE_URL}/users/login`,
      { username: "User2", password: "abc1232" },
      { validateStatus: () => true } // prevents axios from throwing errors for codes outside of the 200 range
    );

    expect(response.status).to.equal(409);
    expect(response.data.error).to.equal("INVALID_USERNAME_OR_PASSWORD");
  });

  it("GET dogs/ should return a list of all the registered dogs", async function () {
    // Gets actual dogs directly from the collection
    const actualDogs = await Dog.find().lean();

    // Normalizes the fields of the dogs due to the date object used for the creation and update timestamp fileds
    const normalizedDogs = actualDogs?.map((dog) => ({
      ...dog,
      _id: dog._id.toString(),
      createdAt: dog.createdAt.toISOString(),
      updatedAt: dog.updatedAt.toISOString(),
    }));

    const response = await userA.client.get(`${BASE_URL}/dogs/`);

    expect(response.status).to.be.equal(200);
    expect(normalizedDogs).to.deep.equal(response.data.allDogs);
  });

  it(`POST dogs/register should successfully create a new dog and return the db document`, async function () {
    // Creates newDog object to pass to the register route and to check for successful creation
    const newDog = {
      name: "Buster",
      description: "Big boi",
    };
    const response = await userA.client.post(
      `${BASE_URL}/dogs/register`,
      newDog
    );
    const dogUUID = response.data.dogUUID;
    const dbCheck = await Dog.find({ dogUUID }); // Gets dog information directly from the collection
    expect(dbCheck).to.exist;
    expect(response.data.message).to.include(newDog.name);
  });

  it(`DELETE dogs/:dog should successfully delete the dog with the provided UUID`, async function () {
    const response = await userA.client.delete(
      `${BASE_URL}/dogs/${testDogA.uuid}`
    );
    expect(response.data.message).to.include(testDogA.uuid);
    const dog = await Dog.findOne({ uuid: testDogA.uuid });
    expect(dog).to.not.exist;
  });

  it(`DELETE dogs/:dog should return 409 error dog not found`, async function () {
    // Creates new user
    const { user, token } = await registerUser("User2", "abc1234");

    // Sets new jwt token into cookie jar
    await userB.jar.setCookie(`token=${token}`, BASE_URL);

    const response = await userB.client.delete(
      `${BASE_URL}/dogs/${testDogA.uuid}`,
      { validateStatus: () => true } // prevents axios from throwing errors for codes outside of the 200 range
    );
    expect(response.status).to.equal(401);
    expect(response.data.error).to.equal(
      "CANNOT_DELETE_DOG_YOU_DID_NOT_REGISTER_OR_THAT_HAS_BEEN_ADOPTED"
    );
  });

  it(`DELETE dogs/:dog should return 404 error dog not found`, async function () {
    const response = await userA.client.delete(`${BASE_URL}/dogs/1`, {
      validateStatus: () => true, // prevents axios from throwing errors for codes outside of the 200 range
    });
    expect(response.status).to.equal(404);
    expect(response.data.error).to.equal("DOG_NOT_FOUND");
  });

  it(`POST dogs/adopt/:dog should successfully change the dog status to adopted and add the dog uuid to the owners adopted array`, async () => {
    // Creates new user
    const { user, token } = await registerUser("User2", "abc1234");

    // Sets new jwt token into cookie jar
    await userB.jar.setCookie(`token=${token}`, BASE_URL);

    const response = await userB.client.post(
      `${BASE_URL}/dogs/adopt/${testDogA.uuid}`,
      { message: "Big thanks for dog" }
    );
    expect(response.data.message).to.equal(
      `${user.username} successfully adopted ${testDogA.name}`
    );

    // Checks the status of the dog in the collection
    const dog = await Dog.findOne({ uuid: testDogA.uuid });
    expect(dog.status).to.equal("adopted");

    // Checks that the user now has the adopted dogUUID added to their adopteDog list
    const user2 = await User.findOne({ username: user.username });
    expect(user2.adoptedDogs.length).to.equal(1);
  });

  it(`POST dogs/adopt/:dog should return 401 error cannot adopt a dog you own or is not available`, async () => {
    const response = await userA.client.post(
      `${BASE_URL}/dogs/adopt/${testDogA.uuid}`,
      { message: "Big thanks for dog" },
      { validateStatus: () => true } // prevents axios from throwing errors for codes outside of the 200 range
    );
    expect(response.status).to.equal(401);
    expect(response.data.error).to.equal(
      `CANNOT_ADOPT_DOG_YOU_OWN_OR_IS_NOT_AVAILABLE`
    );
  });

  it(`POST dogs/adopt/:dog should return 404 error dog not found`, async () => {
    const response = await userA.client.post(
      `${BASE_URL}/dogs/adopt/1`,
      { message: "Big thanks" },
      { validateStatus: () => true } // prevents axios from throwing errors for codes outside of the 200 range
    );
    expect(response.status).to.equal(404);
    expect(response.data.error).to.equal(`DOG_NOT_FOUND`);
  });

  it(`GET /users/dogs/registered should return the list of dogs the user has registered`, async () => {
    const response = await userA.client(`${BASE_URL}/users/dogs/registered`);
    expect(response.data.dogs.length).to.equal(1);
    expect(response.data);
  });
  it(`GET /users/dogs/registered should return the second page of the list of dogs the user has registered `, async () => {
    // Creates newDog to test pagination and limit features
    const { newDog } = await registerDog("Fido", "Bow wow", "User1");

    const response = await userA.client(
      `${BASE_URL}/users/dogs/registered?limit=1&page=2`
    );
    expect(response.data.dogs.length).to.equal(1);
    expect(response.data.dogs[0].uuid).to.equal(newDog.uuid);
  });

  it(`GET /users/dogs/registered should return the filtered list of dogs the user has registered based on the provided filter`, async () => {
    //Creates new dog to test filter feature
    const { newDog } = await registerDog("Fido", "Bow wow", "User1");

    const response = await userA.client(
      `${BASE_URL}/users/dogs/registered?filter=adopted`
    );
    expect(response.data.dogs.length).to.equal(0);

    const response1 = await userA.client(
      `${BASE_URL}/users/dogs/registered?filter=available`
    );
    expect(response1.data.dogs.length).to.equal(2);
  });

  it(`GET /users/dogs/adoptedDogs should return the list of adopted dogs and support pagination`, async () => {
    // Creates new dog to test pagination and limit
    const { newDog } = await registerDog("Fido", "Bow wow", "User1");

    // Updates newDog's status to adopted
    const newDogInformaiton = await Dog.findOneAndUpdate(
      { uuid: newDog.uuid },
      { $set: { status: "adopted" } },
      { new: true }
    );

    //Updates testDogA's status to adopted
    const dog = await Dog.findOneAndUpdate(
      { uuid: testDogA.uuid },
      { $set: { status: "adopted" } },
      { new: true }
    );

    // Adds both dogs to the testUserA adoptedDogs list
    await User.findOneAndUpdate(
      { username: testUserA.username },
      { $addToSet: { adoptedDogs: { $each: [newDog.uuid, testDogA.uuid] } } },
      { new: true }
    );

    const response = await userA.client.get(`${BASE_URL}/users/dogs/adopted`);
    expect(response.data.dogs.length).to.equal(2);

    const response1 = await userA.client.get(
      `${BASE_URL}/users/dogs/adopted?page=2&limit=1`
    );
    expect(response1.data.dogs.length).to.equal(1);
    expect(response1.data.dogs[0].uuid).to.equal(newDog.uuid);
  });

  it("should reject all protected routes without a valid token", async () => {
    // Array of protected endpoints and methods
    const protectedRoutes = [
      { method: "get", url: "/dogs/" },
      {
        method: "get",
        url: "/dogs/register",
        data: { name: "dog1", description: "is a dog" },
      },
      { method: "get", url: "/users/dogs/registered" },
      {
        method: "post",
        url: `/dogs/adopt/${testDogA.uuid}`,
        data: { message: "Hi" },
      },
      { method: "delete", url: `/dogs/${testDogA}` },
    ];

    // Iterates through each route and expects to receive the 401 response
    for (const route of protectedRoutes) {
      const response = await axios({
        method: route.method,
        url: `${BASE_URL}${route.url}`,
        data: route.data || {},
        validateStatus: () => true, // prevents axios from throwing errors for codes outside of the 200 range
      });

      expect(response.status).to.equal(401);
      expect(response.data.error).to.equal("Unauthorized User");
    }
  });

  it(`GET/POST /users/information should return 404 error for the route requests to the routes that don't exist`, async () => {
    const response = await userA.client.get(`${BASE_URL}/users/information`, {
      validateStatus: () => true, // prevents axios from throwing errors for codes outside of the 200 range
    });
    expect(response.status).to.equal(404);
    expect(response.data.error).to.equal("NOT_FOUND");

    const response2 = await userA.client.post(
      `${BASE_URL}/users/information`,
      { username: "newUserName" },
      { validateStatus: () => true } // prevents axios from throwing errors for codes outside of the 200 range
    );
    expect(response2.status).to.equal(404);
    expect(response2.data.error).to.equal("NOT_FOUND");
  });
});
