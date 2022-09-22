const socketServerStore = require('../../socketServerStore')

const updateRooms = (toSpecifiedTargetId = null) => {
  const io = socketServerStore.getSocketServerInstance()

  const activeRooms = socketServerStore.getActiveRooms()

  if(toSpecifiedTargetId){
    io.to(toSpecifiedTargetId).emit("active-rooms", {
      activeRooms
    })
  }else{
    io.emit('active-rooms', {
      activeRooms
    })
  }
}

module.exports = {
  updateRooms
} 