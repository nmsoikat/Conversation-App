const socketServerStore = require('../socketServerStore')
const roomsUpdates = require('./updates/rooms')

const roomJoinHandler = (socket, data) => {
  const {roomId} = data
  const userId = socket.user.userId
  const socketId = socket.id

  const newParticipantDetails = {
    userId,
    socketId
  }

  const roomDetails = socketServerStore.getActiveRoom(roomId)

  socketServerStore.joinActiveRoom(roomId, newParticipantDetails)

  roomsUpdates.updateRooms()
}

module.exports = roomJoinHandler;