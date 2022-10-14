import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";
import Avatar from "../../../shared/components/Avatar";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux"

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
  backgroundColor: "#0046ff36",
  width: "100%",
  borderRadius: "0px",
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
  backgroundColor: "#EDF0F8",
  width: "95%",
  width: "calc(100% - 70px)",
  borderRadius: "5px",
  marginBottom: "5px"
});

const SameAuthorMessageText = styled("span")({
  // marginLeft: "70px",
});

//userDetails is login user
const Message = ({ content, sameAuthor, username, date, sameDay, newMessageRef, userDetails, profileImg }) => {
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
        <Avatar username={username} profileImg={sameAuthor ? userDetails?.profileImg : profileImg} />
      </AvatarContainer>
      <MessageContainer style={{ backgroundColor: sameAuthor ? "#EDF0F8" : "#0046ff36" }}>
        <Typography style={{ fontSize: "16px", marginTop: "-20px", color: "#333" }}>
          {username && username[0].toUpperCase() + username.slice(1)}
          {/* <span style={{ fontSize: "12px", color: "#333" }}>{date}</span> */}
        </Typography>
        <MessageContent>{content}</MessageContent>
      </MessageContainer>
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ auth }) => {
  return {
    ...auth
  }
}

export default connect(mapStoreStateToProps, null)(Message);
