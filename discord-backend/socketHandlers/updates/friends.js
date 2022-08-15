const User = require('../../models/user')
const FriendsInvitation = require('../../models/friendInvitation')
const socketServerStore = require('../../socketServerStore')

const updateFriendsPendingInvitation = async (userId) => {
  try {
    const pendingInvitations = await FriendsInvitation
      .find({ receiverId: userId })
      .populate("senderId", "_id username mail")

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

module.exports = {
  updateFriendsPendingInvitation
}