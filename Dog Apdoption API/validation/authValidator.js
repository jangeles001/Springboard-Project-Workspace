const jwt = require("jsonwebtoken");

async function validateCredentials(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized User" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_Secret);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = validateCredentials;
