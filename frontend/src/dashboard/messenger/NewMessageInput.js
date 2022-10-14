import React, { useState } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import { sendDirectMessage } from "../../realtimeCommunication/socketConnection";
import SendIcon from '@mui/icons-material/Send';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import Picker from 'emoji-picker-react';

const MainContainer = styled("div")({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative"
});

const InputWrap = styled("div")({
  position: "relative",
  width: "60%",
});

const Input = styled("input")({
  backgroundColor: "#fff",
  border: "1px solid #081D34",
  width: "90%",
  width: "calc(100% - 52px)",
  height: "44px",
  color: "white",
  borderRadius: "10px",
  fontSize: "14px",
  padding: "0 10px",
  paddingRight: "35px",
  color: "#222"
});


const NewMessageInput = ({ chosenChatDetails, newMessageRef }) => {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiData, event) => {
    // setMessage(prevInput => prevInput + emojiObject.emoji);
    // debugger;
    setMessage(message + emojiData.emoji);
    setShowPicker(false);
  };

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      if (message) {
        handleSendMessage();
      }
    }
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      setMessage("");

      newMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  };

  return (
    <MainContainer>
      {showPicker && <Picker
        pickerStyle={{ width: '100%' }}
        emojiStyle="facebook"
        lazyLoadEmojis={true}
        onEmojiClick={onEmojiClick} 
        />}

      <InputWrap>
        <Input
          placeholder={`Write message to ${chosenChatDetails.username}`}
          value={message}
          onChange={handleMessageValueChange}
          onKeyDown={handleKeyPressed}
        />
        <AddReactionIcon
          sx={{ position: "absolute", right: "10px", top:"10px", cursor: "pointer" }}
          onClick={() => setShowPicker(!showPicker)} />
      </InputWrap>

      <SendIcon
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "8px",
          marginLeft: "10px",
          color: "#081D34",
          border: "1px solid #081D34",
          cursor: "pointer"
        }}
        onClick={handleSendMessage}
      />
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(NewMessageInput);
