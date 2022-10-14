import React from "react";
import Button from "@mui/material/Button";
import Avatar from "../../../shared/components/Avatar";
import Typography from "@mui/material/Typography";
import OnlineIndicator from "./OnlineIndicator";
import { chatTypes, getActions as chatGetActions } from '../../../store/actions/chatActions'
import { getActions as controlBarActions } from '../../../store/actions/controlBarActions'
import { connect } from 'react-redux'

const FriendsListItem = ({ id, username, profileImg, isOnline, setChosenChatDetails, toggleFriendsBar }) => {
  const handleChooseActiveConversation = () => {
    setChosenChatDetails({ id, username, profileImg }, chatTypes.DIRECT)
    toggleFriendsBar(false) //close friend list // toggle with false value
  }
// console.log(profileImg);
  return (
    <Button
      onClick={handleChooseActiveConversation}
      style={{
        width: "100%",
        height: "45px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <Avatar username={username} profileImg={profileImg} />
      <Typography
        style={{
          marginLeft: "10px",
          fontWeight: 700,
          color: "#555",
        }}
        variant="subtitle1"
        align="left"
      >
      {username && username[0].toUpperCase() + username.slice(1)}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...chatGetActions(dispatch),
    ...controlBarActions(dispatch)
  }
}
export default connect(null, mapActionsToProps)(FriendsListItem);
