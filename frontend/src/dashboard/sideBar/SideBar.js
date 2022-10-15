import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import AudioOnlyButton from "./AudioOnlyButton";
import { connect } from "react-redux";
import ActiveRoomButton from "./ActiveRoomButton";

const MainContainer = styled("div")({
  width: "72px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#081D34",
  flexShrink: 0
});

const SideBar = ({ activeRooms, isUserInRoom }) => {
  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
      {/* <AudioOnlyButton isUserInRoom={isUserInRoom} /> */}
      {activeRooms.map((room) => (
        <ActiveRoomButton
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);
