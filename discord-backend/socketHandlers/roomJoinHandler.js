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

  const activeRoomDetails = socketServerStore.getActiveRoom(roomId)

  socketServerStore.joinActiveRoom(roomId, newParticipantDetails)

  //send information to users in room that they should prepare for incoming connection
  activeRoomDetails.participants.forEach(participant => {
    //if already joined no need to send connection-prepare event
    if(newParticipantDetails.socketId !== participant.socketId){
      socket.to(participant.socketId).emit("connection-prepare", {
        newConnectedUserSocketId: newParticipantDetails.socketId
      })
    }
  });

  roomsUpdates.updateRooms()
}

module.exports = roomJoinHandler;