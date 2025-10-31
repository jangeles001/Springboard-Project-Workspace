const { User } = require("../models/userSchema");
const { generateSalt, hashPassword } = require("../utils/hash");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function createUser(req, res) {
  const { username, password } = req.body;

  const salt = await generateSalt();
  const hashedPassword = await hashPassword(password, salt);

  try {
    const user = await User.create({ username, hashedPassword });
    const payload = { sub: user.uuid.toString(), username: username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Sets the cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents access via JavaScript
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return res.json({ message: "Authenticated" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
}

async function getRegisteredDogs(req, res) {
  const user = await findOne({ uuid: req.user.sub });
  const registerdDogsUUIDS = user;
}

module.exports = { createUser, getRegisteredDogs };
