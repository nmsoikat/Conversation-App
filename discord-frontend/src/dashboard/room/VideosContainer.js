import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideosContainer = ({
  localStream,
  remoteStreams,
  screenSharingStream,
  videoSingleView
}) => {
  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
        styleObj={videoSingleView.isEnable ? ((localStream?.id === videoSingleView.streamId || screenSharingStream?.id === videoSingleView.streamId) ? { width: '100%', height: '100%' } : { width: 0, height: 0 }) : {}}
      />
      {/* every media stream have id */}
      {remoteStreams.map((stream) => (
        <Video stream={stream} key={stream.id} styleObj={videoSingleView.isEnable ? (stream.id === videoSingleView.streamId ? { width: '100%', height: '100%' } : { width: 0, height: 0 }) : {}} />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(VideosContainer);
