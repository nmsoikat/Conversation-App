import React, { useState } from "react";
import { styled } from "@mui/system";
import DropdownMenu from "./DropdownMenu";
import ChosenOptionLabel from "./ChosenOptionLabel";
import { connect } from "react-redux";
import UpdateProfileDialog from "./UpdateProfileDialog";

const MainContainer = styled("div")({
  height: "48px",
  backgroundColor: "#081D34",
  borderBottom: "3px solid #2462a6",
  boxShadow: "0 3px rgb(36 98 166 / 63%);",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 15px",
  zIndex: "0"
});

const ProfileWrap = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer"
})


const AppBar = ({ username, profileImg }) => {
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
          backgroundImage: `url("upload/${profileImg ? profileImg : 'default-profile-img.png'}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          marginRight: "10px"
        }}></div>

        <div>
          <span style={{ display: "block", color: "#fff" }}>
            {username}
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

const mapStoreStateToProps = ({ auth }) => {
  return {
    ...auth.userDetails
  }
}

export default connect(mapStoreStateToProps, null)(AppBar);
