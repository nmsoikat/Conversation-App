const socketServerStore = require('../socketServerStore')

const roomSignalingDataHandler = (socket, data) => {
  const { newConnectedUserSocketId, signal } = data;

  const signalingData = {signal, newConnectedUserSocketId: socket.id}
  socket.to(newConnectedUserSocketId).emit("connection-signal", signalingData)
}

module.exports = roomSignalingDataHandler;