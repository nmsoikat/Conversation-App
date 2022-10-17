import { setLocalStream, setRemoteStreams } from '../store/actions/roomActions'
import store from '../store/store'
import Peer from 'simple-peer'
import * as socketConnection from './socketConnection'

const getConfiguration = () => {
  // const turnIceServer = null;
  const turnIceServer = true;

  if (turnIceServer) {
    //TODO: user TURN server credential
    //   const iceConfiguration = {
    //     iceServers: [
    //         {
    //             urls: 'turn:my-turn-server.mycompany.com:19403',
    //             username: 'optional-username',
    //             credentials: 'auth-token'
    //         }
    //     ]
    // }

    // const peerConnection = new RTCPeerConnection(iceConfiguration);

    return {
      iceServers: [
        {
          urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
          username: 'webrtc',
          credentials: 'webrtc'
        }
      ]
    }
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
      //console.log('stream', stream);
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

const peers = {}

export const prepareNewPeerConnection = (newConnectedUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream

  if (isInitiator) {
    console.log("preparing new peer connection as initiator");
  } else {
    console.log("preparing new peer connection as not initiator");
  }

  peers[newConnectedUserSocketId] = new Peer({
    initiator: isInitiator, //if false connection will not establish // if true connection will establish
    config: getConfiguration(),
    stream: localStream
  })

  //necessary data which is the ICE candidate and SDP information
  peers[newConnectedUserSocketId].on('signal', data => {
    const signalData = {
      signal: data,
      newConnectedUserSocketId: newConnectedUserSocketId
    }

    /////TODO:
    //pass signaling data to other user
    //socketConnection.signalPeerData(signalPeerData)
    socketConnection.signalPeerData(signalData)
  })

  peers[newConnectedUserSocketId].on('stream', (remoteStream) => {
    /////TODO:
    //add new remote stream to our server store
    console.log("Remote stream came from other user");
    console.log("Direct connection has been establish");

    /*
      if this stream will came from the other user what we like to do,
      it will take this stream and add this information
      from which user this stream belong.
      that is why add "newConnectedUserSocketId" this property in "remoteStream"
    */
    remoteStream.newConnectedUserSocketId = newConnectedUserSocketId
    addNewRemoteStream(remoteStream)
  })
}

export const handleSignalingData = (data) => {
  const { newConnectedUserSocketId, signal } = data;

  //with that logic will be able to exchange that SDP and ICE candidate information
  //between users
  //this is need to establish direct connection.
  if (peers[newConnectedUserSocketId]) {
    peers[newConnectedUserSocketId].signal(signal)
  }
}

const addNewRemoteStream = (remoteStream) => {
  //render remote stream
  const remoteStreams = store.getState().room.remoteStreams
  const newRemoteStreams = [...remoteStreams, remoteStream]

  store.dispatch(setRemoteStreams(newRemoteStreams))
}

//1. close all connection
export const closeAllConnection = () => {
  //{a:1,b:2} => [[a,1],[b,2]].forEach((arr) => {arr[0] //key //a})
  Object.entries(peers).forEach(peer => {
    const newConnectedUserSocketId = peer[0] //key
    if (peers[newConnectedUserSocketId]) {
      console.log('user destroy');
      peers[newConnectedUserSocketId].destroy();
      delete peers[newConnectedUserSocketId];
    }
  })
}

//2. close connection from other user
export const handleParticipantLeftRoom = (data) => {
  const { newConnectedUserSocketIdLeaved } = data;

  //delete from other user
  if (newConnectedUserSocketIdLeaved && peers[newConnectedUserSocketIdLeaved]) {
    console.log('other user destroy');
    peers[newConnectedUserSocketIdLeaved].destroy();
    delete peers[newConnectedUserSocketIdLeaved];
  }

  //remove remote stream
  const remoteStreams = store.getState().room.remoteStreams;
  const updatedRemoteStreams = remoteStreams
    .filter(remoteStream => remoteStream.newConnectedUserSocketId !== newConnectedUserSocketIdLeaved)

  store.dispatch(setRemoteStreams(updatedRemoteStreams))
}

export const switchOutgoingTracks = (stream) => {
  //taking every connection object
  for (let socket_id in peers) {
    //for every connection object getting tracks
    for (let index in peers[socket_id].streams[0].getTracks()) {
      //switch track
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};