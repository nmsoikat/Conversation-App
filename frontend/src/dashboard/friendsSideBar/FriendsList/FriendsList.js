import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { connect } from 'react-redux'


const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const checkOnlineUser = (friends = [], onlineUsers = []) => {
  friends.forEach(friend => {
    friend.isOnline = onlineUsers.find((user) => user.userId === friend.id) ? true : false
  })
  
  return friends
}

const FriendsList = ({ friends, onlineUsers }) => {
  return (
    <MainContainer>
      {checkOnlineUser(friends, onlineUsers).map((f) => (
        <FriendsListItem
          username={f.username}
          profileImg={f.profileImg}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends
  }
}
export default connect(mapStoreStateToProps)(FriendsList);
