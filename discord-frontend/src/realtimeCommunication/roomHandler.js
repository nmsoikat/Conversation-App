import { setActiveRooms, setIsUserJoinedOnlyWithAudio, setLocalStream, setOpenRoom, setRoomDetails } from "../store/actions/roomActions";
import store from "../store/store"
import * as socketConnection from './socketConnection'
import * as webRTCHandler from './webRTCHandler'

export const createNewRoom = () => {
  //if audio/video connected
  const successCallBack = () => {
    store.dispatch(setOpenRoom(true, true));
    socketConnection.createNewRoom();
  }

  const audioOnly = store.getState().room.audioOnly

  webRTCHandler.getLocalStreamPreview(audioOnly, successCallBack)
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;

  store.dispatch(setRoomDetails(roomDetails))
}

export const updateActiveRoom = (data) => {
  //currently all active rooms came from server
  const { activeRooms } = data;
  console.log('all active rooms', activeRooms);
  //one of my friend create the room
  const rooms = []
  const friends = store.getState().friends.friends;

  for (let room of activeRooms) {
    for (let friend of friends) {
      if (friend.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUserName: friend.username })
      }
    }
  }

  store.dispatch(setActiveRooms(rooms))
}

export const joinRoom = (roomId) => {
  //if audio/video connected
  const successCallBack = () => {
    store.dispatch(setRoomDetails({ roomId }))
    store.dispatch(setOpenRoom(false, true))
    socketConnection.joinRoom({ roomId })
  }

  const audioOnly = store.getState().room.audioOnly

  webRTCHandler.getLocalStreamPreview(audioOnly, successCallBack)
}

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId

  //stop streaming when user is leave the room
  const localStream = store.getState().room.localStream
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop())
    store.dispatch(setLocalStream(null))
  }

  socketConnection.leaveRoom({ roomId })
  store.dispatch(setRoomDetails(null))
  store.dispatch(setOpenRoom(false, false))
}

// export const createNewRoom = () => {
//   const successCalbackFunc = () => {
//     store.dispatch(setOpenRoom(true, true));

//     const audioOnly = store.getState().room.audioOnly;
//     store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
//     // socketConnection.createNewRoom();
//   };
//   successCalbackFunc();
//   const audioOnly = store.getState().room.audioOnly;
//   // webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
// };