import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { setVideoSingleView } from "../../store/actions/roomActions";
import store from "../../store/store"
import { connect } from "react-redux";
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

const MainContainer = styled("div")({
  height: "50%",
  width: "50%",
  backgroundColor: "#222",
  borderRadius: "8px",
});

const VideoEl = styled("video")({
  width: "100%",
  height: "100%",
});

const Video = ({ stream, isLocalStream, audioOnly, styleObj }) => {
  const videoRef = useRef();

  useEffect(() => {
    // const video = videoRef.current
    // video.srcObject = stream
    const video = videoRef.current || {}; //audio call
    video.srcObject = stream || ""; //audio call

    video.onloadedmetadata = () => {
      video?.play();
    };
  }, [stream]);

  const videoSingleViewOpen = ({ isEnable, streamId }) => {
    store.dispatch(setVideoSingleView({ isEnable, streamId }))
  }

  return (
    <MainContainer onClick={() => videoSingleViewOpen({ isEnable: true, streamId: stream.id })} style={styleObj}>
      {
        audioOnly ?
          <div style={{ height:"100%", display: "flex", justifyContent: "center", alignItems:"center" }}>
            <HeadsetMicIcon style={{color: "#999", fontSize: "50px"}} />
          </div> :
          <VideoEl ref={videoRef} autoPlay muted={isLocalStream ? true : false} />
      }
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps, null)(Video);
