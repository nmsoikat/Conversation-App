import { setIsUserJoinedOnlyWithAudio, setOpenRoom } from "../store/actions/roomActions";
import store from "../store/store"

export const createNewRoom = () => {
  const successCalbackFunc = () => {
    store.dispatch(setOpenRoom(true, true));

    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    // socketConnection.createNewRoom();
  };
  successCalbackFunc();
  const audioOnly = store.getState().room.audioOnly;
  // webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
};