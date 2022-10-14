const User = require('../../models/user')
const FriendsInvitation = require('../../models/friendInvitation')
const socketServerStore = require('../../socketServerStore')

const updateFriendsPendingInvitation = async (userId) => {
  try {
    const pendingInvitations = await FriendsInvitation
      .find({ receiverId: userId })
      .populate("senderId", "_id username mail profileImg")

    //find all active connections of specific userId
    const receiverList = socketServerStore.getActiveConnections(userId)

    const io = socketServerStore.getSocketServerInstance()

    //send to each user
    receiverList.forEach(receiverSocketId => {
      io.to(receiverSocketId).emit("friends-invitations", {
        pendingInvitations: pendingInvitations ? pendingInvitations : []
      })
    })
  } catch (error) {
    console.log(error);
  }
}

const updateFriendsList = async (userId) => {
  try {
    //find all active connections of specific usersId //same user multiple loggedIn
    const receiverList = socketServerStore.getActiveConnections(userId)

    if (receiverList.length) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate("friends", "_id username mail profileImg")

      if (user) {
        const friendsList = user.friends.map(friend => ({
          id: friend._id,
          mail: friend.mail,
          username: friend.username,
          profileImg: friend.profileImg
        }))

        const io = socketServerStore.getSocketServerInstance()

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit("friends-list", {
            friends: friendsList.length ? friendsList : []
          })
        })
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  updateFriendsPendingInvitation,
  updateFriendsList
}