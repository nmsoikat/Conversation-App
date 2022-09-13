import io from 'socket.io-client'
import { updateDirectChatHistoryIfActive } from '../shared/utils/chat';
import { setPendingFriendsInvitation, setFriends, setOnlineUsers } from '../store/actions/friendsActions';
import store from '../store/store'

let socket = null;
export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;

  socket = io('http://localhost:5001', {
    auth: {
      token: jwtToken
    }
  })

  socket.on('connect', () => {
    console.log("user connected");
    console.log(socket.id);
  })

  socket.on('friends-invitations', (data) => {
    const { pendingInvitations } = data
    store.dispatch(setPendingFriendsInvitation(pendingInvitations))
  })

  socket.on('friends-list', (data) => {
    const {friends} = data;
    store.dispatch(setFriends(friends))
  })

  socket.on('online-users', (data) => {
    const {onlineUsers} = data
    store.dispatch(setOnlineUsers(onlineUsers))
  })

  socket.on("direct-chat-history", (data) => {
    //direct chat history came from server
    console.log('direct chat history data',data);
    updateDirectChatHistoryIfActive(data)
  })
}

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
}

export const getDirectChatHistory = (data) => {
  //direct chat history event fire to server for get history
  socket.emit("direct-chat-history", data);
}

//connectWithSocketServer //call this function when login complete