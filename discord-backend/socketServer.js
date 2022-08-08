const registerSocketServer = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  io.on("connection", (socket) => {
    console.log("A user is connected");
    console.log(socket.id);
  })
}

const { Server } = require('socket.io');
const registerSocketServerV2 = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  io.on("connection", (socket) => {
    console.log("A user is connected");
    console.log(socket.id);
  })
}

module.exports = {
  registerSocketServer
}