const socketServerStore = require('../socketServerStore')
const friendsUpdates = require('./updates/friends')

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  socketServerStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId
  })

  //when user is connected update pending friends invitation list also
  friendsUpdates.updateFriendsPendingInvitation(userDetails.userId)
}

module.exports = newConnectionHandler;