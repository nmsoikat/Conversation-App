import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./sideBar/SideBar";
import FriendsSideBar from "./friendsSideBar/FriendsSideBar";
import Messenger from "./messenger/Messenger";
import AppBar from "./appBar/AppBar";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions";
import { connectWithSocketServer } from '../realtimeCommunication/socketConnection'
import Room from "./room/Room";

const MainContainer = styled("div")({
  width: "100%",
  height: "100vh",
});

const Wrapper = styled("div")({
  width: "100%",
  height: "100%",
  marginTop: "3px",
  height: "calc(100% - 54px)",
  display: "flex",
});

const Dashboard = ({ setUserDetails, isUserInRoom, isFriendsBarVisible }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      //console.log(userDetails);
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails))
    }
  }, []);

  return (
    <MainContainer>
      <AppBar />
      <Wrapper>
        <SideBar />
        {isFriendsBarVisible && <FriendsSideBar />}
        <Messenger />
        {isUserInRoom && <Room />}
      </Wrapper>
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room, controlBar }) => {
  return {
    ...room,
    ...controlBar
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
