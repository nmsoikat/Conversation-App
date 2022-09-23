const socketServerStore = require('../socketServerStore')
const roomsUpdates = require('./updates/rooms')

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;
  const userId = socket.user.userId
  const socketId = socket.id
  
  const activeRoom = socketServerStore.getActiveRoom(roomId)

  if(activeRoom){
    socketServerStore.leaveActiveRoom(roomId, socketId)
  
    roomsUpdates.updateRooms()
  }
}

module.exports = roomLeaveHandler;