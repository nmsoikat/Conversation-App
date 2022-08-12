const jwt = require('jsonwebtoken')

const protectSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    socket.user = decoded;
  } catch (err) {
    next(err)
  }

  next()
}

module.exports = protectSocket;