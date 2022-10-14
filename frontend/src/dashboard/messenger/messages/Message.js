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
  // backgroundColor: "#0046ff36",
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
  // backgroundColor: "#EDF0F8",
  width: "95%",
  width: "calc(100% - 70px)",
  borderRadius: "0px",
  marginBottom: "5px"
});

const SameAuthorMessageText = styled("span")({
  // marginLeft: "70px",
});

//userDetails is login user
const Message = ({ content, sameAuthor, date, sameDay, newMessageRef, author, chosenChatDetails, userDetails }) => {
  const isAuthorLoginUser = author._id === userDetails._id
  // const msgDate = new Date(date)
  // const msgTime = `${msgDate.getHours()}:${msgDate.getMinutes()} ${msgDate.getHours() >= 12 ? 'PM' : 'AM'}`

  useEffect(() => {
    // need reference to show this element
    newMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [content])

  if (sameAuthor && sameDay) {
    return (
      <SameAuthorMessageContent style={{ backgroundColor: isAuthorLoginUser ? "#EDF0F8" : "#0046ff36" }}>
        <SameAuthorMessageText>{content}</SameAuthorMessageText>
      </SameAuthorMessageContent>
    );
  }

  return (
    // ref={newMessageRef}
    <MainContainer ref={newMessageRef}>
      <AvatarContainer>
        <Avatar username={author.username} profileImg={isAuthorLoginUser ? userDetails?.profileImg : author.profileImg} />
      </AvatarContainer>
      <MessageContainer style={{ backgroundColor: isAuthorLoginUser ? "#EDF0F8" : "#0046ff36" }}>
        <Typography style={{ fontSize: "12px", marginTop: "-20px", color: "#333" }}>
          {author.username && author.username[0].toUpperCase() + author.username.slice(1)}
          {/* <span style={{ fontSize: "12px", color: "#333" }}> ({date}) </span> */}
          {/* <span style={{ fontSize: "12px", color: "#555" }}> {(msgTime)} </span> */}
        </Typography>
        <MessageContent style={{ fontSize: "14px", color: "#222" }}>{content}</MessageContent>
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
