const socketServerStore = require('../socketServerStore')
const roomsUpdates = require('./updates/rooms')

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;
  const userId = socket.user.userId
  const socketId = socket.id
  
  const activeRoom = socketServerStore.getActiveRoom(roomId)

  if(activeRoom){
    //user just leave the room
    socketServerStore.leaveActiveRoom(roomId, socketId)
    
    //leave from other users
    const updatedActiveRoom = socketServerStore.getActiveRoom(roomId);
    if(updatedActiveRoom){
      updatedActiveRoom.participants.forEach((participant) => {
        socket.to(participant.socketId).emit("room-participant-left", {
          newConnectedUserSocketIdLeaved: socketId
        })
      })
    }

    roomsUpdates.updateRooms()
  }
}

module.exports = roomLeaveHandler;