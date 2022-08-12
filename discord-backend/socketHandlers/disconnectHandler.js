const socketServerStore  = require("../socketServerStore")

const disconnectHandler = async (socket) => {
  console.log(socket.id);
  socketServerStore.removeDisconnectedUser(socket.id)
}

module.exports = disconnectHandler