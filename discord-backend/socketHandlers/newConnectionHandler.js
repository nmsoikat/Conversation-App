const socketServerStore = require('../socketServerStore')
const friendsUpdates = require('./updates/friends')
const roomsUpdates = require('./updates/rooms')

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  socketServerStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId
  })

  //when user is connected update pending friends invitation list also
  friendsUpdates.updateFriendsPendingInvitation(userDetails.userId)

  //update friends list
  friendsUpdates.updateFriendsList(userDetails.userId)

  //update active rooms 
  /*
    * if user reload the browser he will leaved from room
      so, that he can not see the room in left side bar

    * but, he should see the room, so that the user can re join
  */

  setTimeout(() => {
    roomsUpdates.updateRooms(socket.id)
  }, 500) //timeout //connection should establish perfectly//then update room
}

module.exports = newConnectionHandler;