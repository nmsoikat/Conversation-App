import React from "react";
import { styled } from "@mui/system";
import DropdownMenu from "./DropdownMenu";
import ChosenOptionLabel from "./ChosenOptionLabel";
import { connect } from "react-redux";

const MainContainer = styled("div")({
  // position: "absolute",
  // right: "0",
  // top: "0",
  height: "48px",
  // borderBottom: "1px solid black",
  backgroundColor: "#081D34",
  borderBottom: "3px solid #2462a6",
  boxShadow: "0 3px rgb(36 98 166 / 63%);",
  // width: "calc(100% - 102px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
  zIndex: "0"
});

const ProfileWrap = styled("div")({
  display: "flex",
  alignItems: "center"
})


const AppBar = ({ name }) => {
  return (
    <MainContainer>
      <ProfileWrap>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "url('images/default-profile-img.jpg') center center",
          backgroundSize: "cover",
          marginRight: "10px"
        }}></div>

        <div>
          <span style={{ display: "block", color: "#fff" }}>
            Rohim
            {/* {name[0].toUpperCase() + name.slice(1)} */}
          </span>
          <span style={{ display: "inline-block", color: "green" }}>active</span>
        </div>
      </ProfileWrap>
      <ChosenOptionLabel />
      <DropdownMenu />
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    name: chat.chosenChatDetails?.username
  }
}

export default connect(mapStoreStateToProps)(AppBar);
