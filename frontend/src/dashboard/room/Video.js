import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { setVideoSingleView } from "../../store/actions/roomActions";
import store from "../../store/store"

const MainContainer = styled("div")({
  height: "50%",
  width: "50%",
  backgroundColor: "black",
  borderRadius: "8px",
});

const VideoEl = styled("video")({
  width: "100%",
  height: "100%",
});

const Video = ({ stream, isLocalStream, styleObj}) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  const videoSingleViewOpen = ({ isEnable, streamId }) => {
    store.dispatch(setVideoSingleView({ isEnable, streamId }))
  }

  return (
    <MainContainer onClick={() => videoSingleViewOpen({ isEnable: true, streamId: stream.id })} style={styleObj}>
      <VideoEl ref={videoRef} autoPlay muted={isLocalStream ? true : false} />
    </MainContainer>
  );
};

export default Video;
