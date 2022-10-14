const Conversation = require("../../models/conversation")
const socketServerStore = require("../../socketServerStore")

const updateChatHistory = async (conversationId, toSpecifiedSocketId = null) => {

  const conversation = await Conversation.findById(conversationId).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'author',
      model: 'User',
      select: '_id username profileImg'
    }
  })

  if (conversation) {
    const io = socketServerStore.getSocketServerInstance();

    if (toSpecifiedSocketId) {
      // initial update of chat history
      return io.to(toSpecifiedSocketId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants
      })
    }
    // console.log(conversation);

    /**
     * check if users of this conversation are online
     * if yes emit to them update of messages
     */
    //sender and receiver both
    conversation.participants.forEach(userId => {
      //active devices of this users //user may have multiple device logged in using same account
      const activeConnections = socketServerStore.getActiveConnections(userId.toString())

      // console.log({activeConnections});
      activeConnections.forEach(socketId => {
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        })
      })
    })
  }
}


module.exports = {
  updateChatHistory
}