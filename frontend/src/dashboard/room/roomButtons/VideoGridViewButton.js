import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as roomHandler from "../../../realtimeCommunication/roomHandler";
import { setVideoSingleView } from "../../../store/actions/roomActions";
import store from "../../../store/store";
import GridViewIcon from '@mui/icons-material/GridView';

const VideoGridViewButton = () => {
  const videoSingleViewClose = ({ isEnable, streamId }) => {
    store.dispatch(setVideoSingleView({ isEnable, streamId }))
  }


  return (
    <IconButton onClick={() => videoSingleViewClose({ isEnable: false, streamId: null })} style={{ color: "white" }}>
      <GridViewIcon />
    </IconButton>
  );
};

export default VideoGridViewButton;
