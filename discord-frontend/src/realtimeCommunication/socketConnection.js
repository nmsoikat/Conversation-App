import io from 'socket.io-client'
import { updateDirectChatHistoryIfActive } from '../shared/utils/chat';
import { setPendingFriendsInvitation, setFriends, setOnlineUsers } from '../store/actions/friendsActions';
import store from '../store/store'
import * as roomHandler from './roomHandler'
import * as webRTCHandler from './webRTCHandler'

let socket = null;
export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;

  socket = io('http://localhost:5001', {
    auth: {
      token: jwtToken
    }
  })

  //host local ipv4
  // socket = io('http://192.168.0.108:5001', {
  //   auth: {
  //     token: jwtToken
  //   }
  // })

  socket.on('connect', () => {
    console.log("user connected");
    console.log(socket.id);
  })

  socket.on('friends-invitations', (data) => {
    const { pendingInvitations } = data
    store.dispatch(setPendingFriendsInvitation(pendingInvitations))
  })

  socket.on('friends-list', (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends))
  })

  socket.on('online-users', (data) => {
    const { onlineUsers } = data
    store.dispatch(setOnlineUsers(onlineUsers))
  })

  socket.on("direct-chat-history", (data) => {
    //direct chat history came from server
    console.log('direct chat history data', data);
    updateDirectChatHistoryIfActive(data)
  })

  socket.on("room-create", (data) => {
    // console.log("Created room details came from the server");
    // console.log(data);
    roomHandler.newRoomCreated(data)
  })

  socket.on('active-rooms', data => {
    roomHandler.updateActiveRoom(data)
  })

  socket.on('connection-prepare', data => {
    //coming form server
    //console.log('connection prepare:', data);

    const { newConnectedUserSocketId } = data
    //preparing only for incoming connection //false
    webRTCHandler.prepareNewPeerConnection(newConnectedUserSocketId, false)

    socket.emit('connection-init', { newConnectedUserSocketId })
  })

  socket.on('connection-init', (data) => {
    const {newConnectedUserSocketId} = data;

    //now user is prepared to establish the connection
    //now establish a direct connection for this user //true
    webRTCHandler.prepareNewPeerConnection(newConnectedUserSocketId, true)
  })

  socket.on('connection-signal', (data) => {
    webRTCHandler.handleSignalingData(data)
  })

  socket.on("room-participant-left", (data) => {
    console.log("User left room");

    webRTCHandler.handleParticipantLeftRoom(data)
  })
}

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
}

export const getDirectChatHistory = (data) => {
  //direct chat history event fire to server for get history
  socket.emit("direct-chat-history", data);
}

export const createNewRoom = () => {
  socket.emit("room-create")
}

export const joinRoom = (data) => {
  socket.emit('room-join', data)
}

export const leaveRoom = (data) => {
  socket.emit('room-leave', data)
}

//send signal data to server
export const signalPeerData = (data) => {
  socket.emit("connection-signal", data)
}

//connectWithSocketServer //call this function when login complete