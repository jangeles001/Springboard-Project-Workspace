process.env.NODE_ENV = 'test';

const chai = require("chai");
const dotenv = require("dotenv");
const axios = require("axios");
const mongoose = require("mongoose");
const Dog = require("../schemas/dogSchema")
const expect = chai.expect;
dotenv.config();

describe(" Test cases for Routes", function() {
    before(async function() {
        await mongoose.connect(process.env.MONGO_TEST_URI);
    });

    after(async function() {
        await mongoose.connection.close();
    });

    it('GET / should return a list of all the registered dogs', async function() {
        const actualDogs = await Dog.find().lean();
        const normalizedDogs = actualDogs.map(dog => ({
            ...dog,
            _id: dog._id.toString(),
            createdAt: dog.createdAt.toISOString(),
            updatedAt: dog.updatedAt.toISOString()
        }));
        const response = await axios.get("http://localhost:3000/dogs/");
        expect(response.status).to.be.equal(200);
        expect(normalizedDogs).to.deep.equal(response.data);
    });

    it(`POST / should successfully create a new dog and return the db document`, async function() {
        const newDog = {
            name: "Buster",
            description: "Big boi"
        }
        const response = await axios.post("http://localhost:3000/dogs/", newDog);
        const dogUuid = response.data.uuid;
        const dbCheck = await Dog.find(dogUuid);
        //TODO: Check if dog was created and compare response object and status to expected response.

    })
});