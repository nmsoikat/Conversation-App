import React from 'react'
import { Typography } from "@mui/material";
import { connect } from "react-redux";

function ChosenOptionLabel({ name }) {
  return (
    <Typography
      sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}
    >{`${name ? `Conversation: ${name}` : ""}`}</Typography>
  );
}

const mapStoreStateToProps = ({ chat }) => {
  return {
    name: chat.chosenChatDetails?.username
  }
}
export default connect(mapStoreStateToProps)(ChosenOptionLabel)