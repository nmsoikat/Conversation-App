import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as roomHandler from "../../../realtimeCommunication/roomHandler";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/roomActions";

const CloseRoomButton = ({ setAudioOnly }) => {
  const handleLeaveRoom = () => {
    roomHandler.leaveRoom();
    setAudioOnly(false)
  };

  return (
    <IconButton onClick={handleLeaveRoom} style={{ color: "white" }}>
      <CloseIcon />
    </IconButton>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(CloseRoomButton);
