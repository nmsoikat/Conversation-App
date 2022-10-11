import React from "react";
import Button from "@mui/material/Button";
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import * as roomHandler from "../../realtimeCommunication/roomHandler";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/roomActions";

const AudioOnlyButton = ({ isUserInRoom, setAudioOnly }) => {

  const createNewRoomHandler = () => {
    setAudioOnly(true);

    // create a room and send information to the server
    roomHandler.createNewRoom();
  };

  return (
    <Button
    className="friendBarButton"
      disabled={isUserInRoom}
      onClick={createNewRoomHandler}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "white",
        backgroundColor: "#E94B3CFF",
      }}
    >
      <HeadsetMicIcon />
    </Button>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(AudioOnlyButton);
