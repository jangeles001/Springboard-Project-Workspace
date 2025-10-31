process.env.NODE_ENV = "test";

const chai = require("chai");
const dotenv = require("dotenv");
const axios = require("axios");
const mongoose = require("mongoose");
const Dog = require("../schemas/dogSchema");
const expect = chai.expect;
dotenv.config();

describe(" Test cases for Routes", function () {
  before(async function () {
    await mongoose.connect(process.env.MONGO_TEST_URI);
  });

  after(async function () {
    await mongoose.connection.close();
  });

  it("GET / should return a list of all the registered dogs", async function () {
    const actualDogs = await Dog.find().lean();
    const normalizedDogs = actualDogs.map((dog) => ({
      ...dog,
      _id: dog._id.toString(),
      createdAt: dog.createdAt.toISOString(),
      updatedAt: dog.updatedAt.toISOString(),
    }));
    const response = await axios.get("http://localhost:3000/dogs/");
    expect(response.status).to.be.equal(200);
    expect(normalizedDogs).to.deep.equal(response.data);
  });

  it(`POST dogs/register should successfully create a new dog and return the db document`, async function () {
    const newDog = {
      name: "Buster",
      description: "Big boi",
      owner: 
    };
    const response = await axios.post(
      "http://localhost:3000/dogs/register",
      newDog
    );
    const dogUUID = response.data.uuid;
    const dbCheck = await Dog.find({ dogUUID });
    expect(dbCheck).to.exist;
  });

  it(`DELETE dogs/:dog should successfully delete the dog with the provided UUID`, async function () {
    const dogToDelete = {
      name: "Rex",
      description: "Energetic and kind",
    };
    const created = await Dog.create(dogToDelete);
    const response = await axios.delete(
      `http://localhost:3000/dogs/${created.uuid}`
    );

    const dog = await Dog.find({ uuid: created.uuid });
    expect(dog.length).to.be.equal(0);
  });

  //   it(`POST dogs/adopt/:dog should successfully change the dog status to adopted and add the dog uuid to the owners adopted array`, async function{

  //   });
});
