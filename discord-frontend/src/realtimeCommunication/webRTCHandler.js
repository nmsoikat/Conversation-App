import { setLocalStream } from '../store/actions/roomActions'
import store from '../store/store'
import Peer from 'simple-peer'

const getConfiguration = () => {
  const turnIceServer = null;

  if (turnIceServer) {
    //TODO: user TURN server credential
  } else {
    //in local environment we have not access to the TURN server
    console.warn("Using only STUN server")

    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302" //free stun
        }
      ]
    }
  }
}

const onlyAudioConstraints = {
  audio: true,
  video: false
}

const defaultConstraints = {
  audio: true,
  video: true
}

export const getLocalStreamPreview = (onlyAudio = false, callBackFunc) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints

  //browser
  //ask for permission
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      console.log('stream', stream);
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

const peer = {}

export const prepareNewPeerConnection = (newConnectedUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream

  if (isInitiator) {
    console.log("preparing new peer connection as initiator");
  } else {
    console.log("preparing new peer connection as not initiator");
  }

  peer[newConnectedUserSocketId] = new Peer({
    initiator: isInitiator, //if false connection will not establish // if true connection will establish
    config: getConfiguration(),
    stream: localStream
  })

  //necessary data which is the ICE candidate and SDP information
  peer[newConnectedUserSocketId].on('signal',  data => {
    const signalData = {
      signal: data,
      newConnectedUserSocketId: newConnectedUserSocketId
    }

    //TODO:
    //pass signaling data to other user
    //socketConnection.signalPeerData(signalPeerData)
  })

  peer[newConnectedUserSocketId].on('stream', (remoteStream) => {
    //TODO:
    //add new remote stream to our server store
  })
}