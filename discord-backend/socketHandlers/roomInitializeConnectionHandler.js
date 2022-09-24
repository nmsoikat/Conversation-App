const socketServerStore = require('../socketServerStore')

const roomInitializeConnectionHandler = (socket, data) => {
  const {newConnectedUserSocketId} = data;

  const initData = {newConnectedUserSocketId: socket.id}
  socket.to(newConnectedUserSocketId).emit('connection-init', initData)
}

module.exports = roomInitializeConnectionHandler;