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
  const { activeRooms } = data;
  //new active room came from server
  console.log('new active room came from server', activeRooms);
  store.dispatch(setActiveRooms(activeRooms))
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