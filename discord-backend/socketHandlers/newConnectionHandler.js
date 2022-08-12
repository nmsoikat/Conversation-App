const socketServerStore = require('../socketServerStore')

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  socketServerStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId
  })
}

module.exports = newConnectionHandler;