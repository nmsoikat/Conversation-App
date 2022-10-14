const socketServerStore = require("../socketServerStore")
const roomLeaveHandler = require("./roomLeaveHandler")

const disconnectHandler = async (socket) => {
  //if user in room // also remove the user form room
  const activeRooms = socketServerStore.getActiveRooms()
  activeRooms.forEach(activeRoom => {
    const isUserInRoom = activeRoom.participants.some((participant) => participant.socketId === socket.id)

    if(isUserInRoom){
      roomLeaveHandler(socket, {roomId: activeRoom.roomId})
    }
  })

  //console.log(socket.id);
  socketServerStore.removeDisconnectedUser(socket.id)
}

module.exports = disconnectHandler