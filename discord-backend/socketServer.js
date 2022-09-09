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
const socketServerStore = require('./socketServerStore');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const directMessageHandler = require('./socketHandlers/directMessageHandler')

const registerSocketServerV2 = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  //pass the io instance
  socketServerStore.setSocketServerInstance(io)

  io.use((socket, next) => {
    protectSocket(socket, next);
  })

  const emitOnlineUsers = () => {
    const onlineUsers = socketServerStore.getOnlineUsers();
    io.emit("online-users", {onlineUsers})
  }

  io.on("connection", (socket) => {
    // console.log("A user is connected");
    // console.log(socket.id);

    //new connection handler, which is responsible for save the information at server
    newConnectionHandler(socket, io)

    emitOnlineUsers()


    //direct message
    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data)
    })

    //user lost the connection
    socket.on('disconnect', () => {
      disconnectHandler(socket)
    })
  })

  setInterval(() => {
    emitOnlineUsers()
  }, 1000 * 8)
}

module.exports = {
  // registerSocketServer,
  registerSocketServer: registerSocketServerV2
}