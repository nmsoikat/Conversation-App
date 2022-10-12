import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";
import Avatar from "../../../shared/components/Avatar";
import Typography from "@mui/material/Typography";

const MainContainer = styled("div")({
  width: "100%",
  display: "flex",
  marginTop: "35px",
});

const AvatarContainer = styled("div")({
  marginRight: "8px",
  marginTop: "-16px"
});

const MessageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgb(177 204 234)",
  width: "100%",
  borderRadius: "5px",
  marginBottom: "5px",
});

const MessageContent = styled("div")({
  // color: "#222",
  padding: "8px",
});

const SameAuthorMessageContent = styled("div")({
  marginLeft: "55px",
  color: "#222",
  padding: "8px",
  backgroundColor: "rgb(177 204 234)",
  width: "95%",
  width: "calc(100% - 70px)",
  borderRadius: "5px",
  marginBottom: "5px"
});

const SameAuthorMessageText = styled("span")({
  // marginLeft: "70px",
});

const Message = ({ content, sameAuthor, username, date, sameDay, newMessageRef }) => {
  // //get ref of new message element 
  //// const newMessageRef = useRef();
  //// scroll to new message 
  //// why useEffect here, so this can apply when message load or create
  useEffect(() => {
    // need reference to show this element
    newMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [content])

  if (sameAuthor && sameDay) {
    return (
      <SameAuthorMessageContent>
        <SameAuthorMessageText>{content}</SameAuthorMessageText>
      </SameAuthorMessageContent>
    );
  }

  return (
    // ref={newMessageRef}
    <MainContainer ref={newMessageRef}>
      <AvatarContainer>
        <Avatar username={username} />
      </AvatarContainer>
      <MessageContainer style={{ backgroundColor: username === "rohim" ? "rgb(218 228 239)" : "rgb(177 204 234)" }}>
        <Typography style={{ fontSize: "16px", marginTop: "-20px", color: "#333" }}>
          {username[0].toUpperCase() + username.slice(1)}
          {/* <span style={{ fontSize: "12px", color: "#ddd" }}>{date}</span> */}
        </Typography>
        <MessageContent>{content}</MessageContent>
      </MessageContainer>
    </MainContainer>
  );
};

export default Message;
