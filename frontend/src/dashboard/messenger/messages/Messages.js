import React, { userRef, useEffect } from "react";
import { styled } from "@mui/system";
import MessagesHeader from "./MessagesHeader";
import { connect } from "react-redux";
import DUMMY_MESSAGES from "./DUMMY_MESSAGES";
import Message from "./Message";
import DateSeparator from "./DateSeparator";

const MainContainer = styled("div")({
  // height: "calc(100% - 60px)",
  height: "100%",
  height: "calc(100% - 60px)",
  paddingBottom: "25px",
  boxSizing: "border-box",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const convertDateToHumanReadable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
};

const Messages = ({ chosenChatDetails, messages, newMessageRef}) => {
  //console.log("messages:");
  //console.log(messages);
  // console.log({chosenChatDetails});
  // console.log({messages});
  return (
    <MainContainer>
      <MessagesHeader username={chosenChatDetails?.username} profileImg={chosenChatDetails?.profileImg} />
      
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 &&
          messages[index].author._id === messages[index - 1].author._id;

        const sameDay =
          index > 0 &&
          convertDateToHumanReadable(new Date(message.date), "dd/mm/yy") ===
            convertDateToHumanReadable(
              new Date(messages[index - 1].date),
              "dd/mm/yy"
            );

        return (
          <div key={message._id} style={{ width: "97%" }}>
            {(!sameDay || index === 0) && (
              <DateSeparator
                date={convertDateToHumanReadable(
                  new Date(message.date),
                  "dd/mm/yy"
                )}
              />
            )}
            <Message
              content={message.content}
              author={message.author}
              chosenChatDetails={chosenChatDetails}
              sameAuthor={sameAuthor}
              // date={convertDateToHumanReadable(
              //   new Date(message.date),
              //   "dd/mm/yy"
              // )}
              date={message.date}
              sameDay={sameDay}
              newMessageRef={newMessageRef}
            />
          </div>
        );
      })}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(Messages);
