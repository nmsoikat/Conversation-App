const { v4: uuidV4 } = require('uuid')

const connectedUsers = new Map()
let activeRooms = []

let io = null;
const setSocketServerInstance = (ioInstance) => {
  io = ioInstance
}
const getSocketServerInstance = (ioInstance) => {
  return io
}

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

//if same user connected with multiple device
const getActiveConnections = (userId) => {
  const activeConnections = []

  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      activeConnections.push(key) //push socketId
    }
  })

  return activeConnections
}

//online users
const getOnlineUsers = () => {
  const onlineUsers = []

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId })
  })

  return onlineUsers;
}


//add new active room
const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId
    },
    participants: [
      {
        userId,
        socketId
      }
    ],
    roomId: uuidV4()
  }

  activeRooms = [...activeRooms, newActiveRoom]
  
  console.log("New active room");
  console.log(newActiveRoom);

  return newActiveRoom
}

//get active rooms
const getActiveRooms = () => {
  return  [...activeRooms]
}

module.exports = {
  addNewConnectedUser,
  removeDisconnectedUser,
  getActiveConnections,
  setSocketServerInstance,
  getSocketServerInstance,
  getOnlineUsers,
  addNewActiveRoom,
  getActiveRooms
}