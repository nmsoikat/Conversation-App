import React, { useState } from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import AddFriendDialog from "./AddFriendDialog";
import { styled } from "@mui/system";

const InviteButtonWrap = styled("div")({
  width: "100%", 
  display: "flex", 
  marginTop: "5px", 
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 10px",
  boxSizing: "border-box",
  borderBottom: "1px solid #ddd"
});

const InviteButton = styled("div")({
  width: "60px",
  height: "30px",
  backgroundColor: "#2D6BE6",
  textAlign: "center",
  color: "#fff",
  borderRadius: "10px",
  lineHeight: "30px",
  cursor: "pointer"
});

const AddFriendButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenAddFriendDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddFriendDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {/* <CustomPrimaryButton
        additionalStyles={additionalStyles}
        label="Invite"
        onClick={handleOpenAddFriendDialog}
      /> */}
      <InviteButtonWrap>
        <span style={{ display: "inline-block", color: "#8e9297" }}>Private Message</span>
        <InviteButton onClick={handleOpenAddFriendDialog}>Invite</InviteButton>
      </InviteButtonWrap>
      <AddFriendDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddFriendDialog}
      />
    </>
  );
};

export default AddFriendButton;
