const userService = require("../services/userService");

async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    const { user, token } = await userService.registerUser(username, password);

    // Sets the cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents access via JavaScript
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 24 hour lifetime
    });

    return res.status(201).json({
      message: `User ${user.username} created and authenticated`,
    });
  } catch (error) {
    if (error.message === "USERNAME_ALREADY_EXISTS")
      return res.status(409).json({ error: error.message });

    return res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const { user, token } = await userService.validateUserCredentials(
      username,
      password
    );

    // Sets the cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents access via JavaScript
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 24 hour lifetime
    });

    return res.status(200).json({ message: `${user.username} logged in!` });
  } catch (error) {
    if (error.message === "INVALID_USERNAME_OR_PASSWORD")
      return res.status(409).json({ error: error.message });

    return res.status(500).json({ error: error.message });
  }
}

async function getRegisteredDogs(req, res) {
  try {
    const { page = 1, limit = 10, filter = "all" } = req.query;
    const username = req.user.sub;
    const results = await userService.getUserRegisteredDogs(
      username,
      page,
      limit,
      filter
    );
    return res.status(200).json(results);
  } catch (error) {
    if (error.message === "USER_NOT_FOUND")
      return res.status(404).json({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
}

async function getAdoptedDogs(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const username = req.user.sub;
    const results = await userService.getUserAdoptedDogs(username, page, limit);
    return res.status(200).json(results);
  } catch (error) {
    if (error.message === "USER_NOT_FOUND")
      return res.status(404).json({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { createUser, getRegisteredDogs, login, getAdoptedDogs };
