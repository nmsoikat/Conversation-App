const socketServerStore = require('../../socketServerStore')

const updateRooms = (toSpecifiedSocketId = null) => {
  const io = socketServerStore.getSocketServerInstance()

  const activeRooms = socketServerStore.getActiveRooms()

  if(toSpecifiedSocketId){
    io.to(toSpecifiedSocketId).emit("active-rooms", {
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