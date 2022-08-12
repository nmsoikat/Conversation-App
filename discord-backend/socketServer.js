//different way
// const registerSocketServer = (server) => {
//   const io = require('socket.io')(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"]
//     }
//   })

//   io.on("connection", (socket) => {
//     console.log("A user is connected");
//     console.log(socket.id);
//   })
// }

const { Server } = require('socket.io');
const protectSocket = require('./middlewares/AuthSocket');

const registerSocketServerV2 = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  io.use((socket, next) => {
    protectSocket(socket, next);
  })

  io.on("connection", (socket) => {
    console.log("A user is connected");
    console.log(socket.id);

    //new connection handler, which is responsible for save the information at server
  })
}

module.exports = {
  // registerSocketServer,
  registerSocketServer: registerSocketServerV2
}