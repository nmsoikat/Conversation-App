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
});

const MessagesHeader = ({ username = "", profileImg = "" }) => {
  const style = {
    borderRadius: "50%",
    backgroundImage: `url("upload/${profileImg ? profileImg : 'default-profile-img.png'}")`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  }

  return (
    <MainContainer>
      <StartConversationAvatar sx={style}/>

      <Typography
        sx={{
          color: "#081D34",
          marginLeft: "5px",
          marginRight: "5px",
          textAlign: "center"
        }}
      >
        This is the beginning of your conversation with {username && username[0].toUpperCase() + username.slice(1)}
      </Typography>
    </MainContainer>
  );
};

export default MessagesHeader;
