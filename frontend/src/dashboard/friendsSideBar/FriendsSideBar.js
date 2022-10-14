import React from "react";
import { styled } from "@mui/system";
import AddFriendButton from "./AddFriendButton";
import FriendsTitle from "./FriendsTitle";
import FriendsList from "./FriendsList/FriendsList";
import PendingInvitationsList from "./pendingInvitationsList/PendingInvitationsList";

const MainContainer = styled("div")({
  width: "224px",
  height: "100%",
  height: "calc(100% - 54px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRight: "1px solid #ddd",
  position: "absolute",
  left: "74px",
  zIndex: "2"
});

const FriendsSideBar = () => {
  return (
    <MainContainer>
      <AddFriendButton />
      {/* <FriendsTitle title="Private Messages" /> */}
      <FriendsList />
      <FriendsTitle title="Invitations" />
      <PendingInvitationsList />
    </MainContainer>
  );
};

export default FriendsSideBar;
