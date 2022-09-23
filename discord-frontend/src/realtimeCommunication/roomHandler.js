import { setActiveRooms, setIsUserJoinedOnlyWithAudio, setOpenRoom, setRoomDetails } from "../store/actions/roomActions";
import store from "../store/store"
import * as socketConnection from './socketConnection'

export const createNewRoom = () => {
  store.dispatch(setOpenRoom(true, true));
  socketConnection.createNewRoom();
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
  store.dispatch(setRoomDetails({roomId}))
  store.dispatch(setOpenRoom(false, true))
  socketConnection.joinRoom({roomId})
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