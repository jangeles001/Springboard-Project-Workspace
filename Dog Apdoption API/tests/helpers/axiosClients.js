const axios = require("axios");
const dotenv = require("dotenv");
const { wrapper } = require("axios-cookiejar-support");
const { CookieJar } = require("tough-cookie");
dotenv.config();

function createClient() {
  // Creates a cookie jar
  const jar = new CookieJar();

  // Wraps axios so it supports cookies
  const client = wrapper(
    axios.create({
      baseURL: `http://localhost:${process.env.PORT}`, // server
      withCredentials: true, // sends cookies automatically with each request
      jar, // attaches the cookie jar to the client
    })
  );

  return { client, jar };
}

const userA = createClient();
const userB = createClient();

module.exports = { userA, userB }; // Exports both user clients to be used in tests;
