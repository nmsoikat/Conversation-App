import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import Messages from "./messages/Messages";
import NewMessageInput from "./NewMessageInput";
import { getDirectChatHistory } from "../../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessengerContent = ({ chosenChatDetails }) => {
  //get ref of new message element 
  const [newMessageRef, setNewMessageRef] = useState(useRef())


  useEffect(() => {
    //fetching chat history from specific user id
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <Wrapper >
      <Messages newMessageRef={newMessageRef} />
      <NewMessageInput newMessageRef={newMessageRef} />
    </Wrapper>
  );
};

export default MessengerContent;
