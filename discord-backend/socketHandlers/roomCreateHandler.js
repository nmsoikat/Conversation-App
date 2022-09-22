const socketServerStore = require('../socketServerStore')
const roomsUpdates = require('./updates/rooms')

const roomCreateHandler = (socket) => {
  console.log("handling room create event");

  const userId = socket.user.userId;
  const socketId = socket.id;

  const roomDetails = socketServerStore.addNewActiveRoom(userId, socketId)

  socket.emit('room-create', {
    roomDetails
  })

  roomsUpdates.updateRooms()
}

module.exports = roomCreateHandler;