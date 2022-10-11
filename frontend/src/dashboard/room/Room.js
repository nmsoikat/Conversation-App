import React, { useState } from "react";
import { styled } from "@mui/system";
import ResizeRoomButton from "./ResizeRoomButton";
import RoomButtons from "./roomButtons/RoomButtons";
import VideosContainer from "./VideosContainer";

const MainContainer = styled("div")({
  position: "absolute",
  right: 0,
  bottom: 0,
  zIndex: 2,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2F3136",
});

const fullScreenRoomStyle = {
  // width: "calc(100% - 72px)",
  width: "100%",
  height: "100vh",
};

const minimizedRoomStyle = {
  bottom: "0px",
  right: "0px",
  width: "50%",
  height: "40vh",
};

const Room = () => {
  const [isRoomMinimized, setIsRoomMinimized] = useState(true);

  const roomResizeHandler = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };

  return (
    <MainContainer
      style={isRoomMinimized ? minimizedRoomStyle : fullScreenRoomStyle}
    >
      <VideosContainer />
      <RoomButtons />
      <ResizeRoomButton
        isRoomMinimized={isRoomMinimized}
        handleRoomResize={roomResizeHandler}
      />
    </MainContainer>
  );
};

export default Room;
