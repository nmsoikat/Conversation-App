import React from "react";
import { styled } from "@mui/system";
import Avatar from "../../../shared/components/Avatar";
import Typography from "@mui/material/Typography";

const MainContainer = styled("div")({
  width: "98%",
  display: "column",
  marginTop: "10px",
});

const StartConversationAvatar = styled("div")({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  margin: "10px auto",
  backgroundColor: "#ddd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "700",
});

const MessagesHeader = ({ name = "" }) => {
  return (
    <MainContainer>
      <StartConversationAvatar>{name.substring(0, 2)}</StartConversationAvatar>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#081D34",
          marginLeft: "5px",
          marginRight: "5px",
          textAlign: "center"
        }}
      >
        {name[0].toUpperCase() + name.slice(1)}
      </Typography>
      <Typography
        sx={{
          color: "#081D34",
          marginLeft: "5px",
          marginRight: "5px",
          textAlign: "center"
        }}
      >
        This is the beginning of your conversation with {name}
      </Typography>
    </MainContainer>
  );
};

export default MessagesHeader;
