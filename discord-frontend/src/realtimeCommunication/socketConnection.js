import io from 'socket.io-client'
import { setPendingFriendsInvitation } from '../store/actions/friendsActions';
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
    console.log(pendingInvitations);
    store.dispatch(setPendingFriendsInvitation(pendingInvitations))
  })
}


//connectWithSocketServer //call this function when login complete