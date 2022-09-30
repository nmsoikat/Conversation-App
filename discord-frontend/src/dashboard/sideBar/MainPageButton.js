import React, { useState } from "react";
import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";
import { connect } from "react-redux"
import { getActions } from "../../store/actions/controlBarActions"

const MainPageButton = ({ isFriendsBarVisible, toggleFriendsBar }) => {
  const friendsBarToggler = () => {
    toggleFriendsBar(!isFriendsBarVisible)
  }

  return (
    <Button
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
        // backgroundColor: "#5865F2",
      }}
      onClick={friendsBarToggler}
    >
      <GroupsIcon />
    </Button>
  );
};

const mapStoreStateToProps = ({ controlBar }) => {
  return {
    ...controlBar
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch)
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(MainPageButton);
