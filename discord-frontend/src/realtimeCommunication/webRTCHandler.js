import { setLocalStream } from '../store/actions/roomActions'
import store from '../store/store'

const onlyAudioConstraints = {
  audio: true,
  video: false
}

const defaultConstraints = {
  audio: true,
  video: true
}

export const getLocalStreamPreview = (onlyAudio = false, callBackFunc)=> {
  const constraints = onlyAudio ?  onlyAudioConstraints : defaultConstraints

  //browser
  //ask for permission
  navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    console.log('stream',stream);
    store.dispatch(setLocalStream(stream))
    //if has permission //otherwise we don't need to connect the user to webRTC
    callBackFunc()
  })
  .catch((err) => {
    //have not any permission or audio/video connection problem from device
    console.log(err);
    console.log('can not get an access to local stream');
  })
}