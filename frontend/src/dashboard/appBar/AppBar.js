import React, { useState } from "react";
import { styled } from "@mui/system";
import DropdownMenu from "./DropdownMenu";
import ChosenOptionLabel from "./ChosenOptionLabel";
import { connect } from "react-redux";
import UpdateProfileDialog from "./UpdateProfileDialog";

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
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 15px",
  zIndex: "0"
});

const ProfileWrap = styled("div")({
  display: "flex",
  alignItems: "center"
})


const AppBar = ({ name }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenAddFriendDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddFriendDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <MainContainer>
      <ProfileWrap onClick={handleOpenAddFriendDialog}>
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

      <UpdateProfileDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddFriendDialog}
      />

      <ChosenOptionLabel />
      <DropdownMenu />
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ userDetails }) => {
  return {
    name: userDetails?.username
  }
}

export default connect(mapStoreStateToProps, null)(AppBar);
