const connectedUsers = new Map()

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId })
  console.log("Connected users:");
  console.log(connectedUsers);
}

const removeDisconnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId)
  }

  console.log("all users after disconnected:");
  console.log(connectedUsers);
}

module.exports = {
  addNewConnectedUser,
  removeDisconnectedUser
}