import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextsmsIcon from '@mui/icons-material/Textsms';
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
        backgroundColor: (!isFriendsBarVisible ? '#578CFE': '#5865F2'),
      }}
      onClick={friendsBarToggler}
    >
      <TextsmsIcon />
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
