import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import * as webRTCHandler from "../../../realtimeCommunication/webRTCHandler";

//don't need audio for screen sharing
//we will replace video stream with screen-sharing stream
const constraints = {
  audio: false,
  video: true,
};

const ScreenShareButton = ({
  localStream,
  screenSharingStream,
  setScreenSharingStream,
  isScreenSharingActive,
}) => {
  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        //access to screen share stream
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log("error occurred when trying to get an access to screen share stream");
      }

      if (stream) {
        setScreenSharingStream(stream);
        //switch camera video track to screen sharing video
        webRTCHandler.switchOutgoingTracks(stream);
      }
    } else {
      //switch screen sharing video to camera video
      webRTCHandler.switchOutgoingTracks(localStream); //if audio not provided audio will not switch just video will switch
      screenSharingStream.getTracks().forEach((t) => t.stop()); //kill the screen sharing tracks
      setScreenSharingStream(null); //store clean
    }
  };

  return (
    <IconButton onClick={handleScreenShareToggle} style={{ color: "white" }}>
      {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
};

export default ScreenShareButton;
