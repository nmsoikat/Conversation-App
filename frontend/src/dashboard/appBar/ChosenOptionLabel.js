import React from 'react'
import { Typography } from "@mui/material";
import { connect } from "react-redux";

function ChosenOptionLabel({ name }) {
  return (
    <Typography
      sx={{ fontSize: "16px", color: "white", fontWeight: "normal" }}
    >{`${name ? `Conversation: ${name[0].toUpperCase() + name.slice(1)}` : ""}`}</Typography>
  );
}

const mapStoreStateToProps = ({ chat }) => {
  return {
    name: chat.chosenChatDetails?.username
  }
}
export default connect(mapStoreStateToProps)(ChosenOptionLabel)