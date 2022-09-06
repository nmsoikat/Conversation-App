import io from 'socket.io-client'
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
}

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data)
}


//connectWithSocketServer //call this function when login complete