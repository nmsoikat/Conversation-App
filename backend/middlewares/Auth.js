const User = require("../models/user");
const jwt = require('jsonwebtoken')

exports.protect = async (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send("A token is required for authentication")
  }

  try {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token")
  }

  return next()
}