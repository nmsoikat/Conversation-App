import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import { validateMail } from "../../shared/utils/validators";
import InputWithLabel from "../../shared/components/InputWithLabel";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import { connect } from "react-redux"
import { getActions } from "../../store/actions/authActions"
import EditIcon from '@mui/icons-material/Edit';
import { styled } from "@mui/system";

const UserNameEditWrap = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginTop: "10px",
});

const Input = styled("input")({
  height: "40px",
  border: "none",
  borderBottom: "1px solid #249FBA",
  color: "#fff",
  background: "none",
  margin: 0,
  fontSize: "16px",
  padding: "0 5px",
});


const UpdateProfileDialog = ({
  isDialogOpen,
  closeDialogHandler
}) => {
  const [username, setUsername] = useState("");
  const [editEnable, setEditEnable] = useState(false);

  const handleCloseDialog = () => {
    closeDialogHandler();
  };

  const userNameEditToggle = () => {
    setEditEnable(!editEnable)
  }

  const handleValueChange = (event) => {
    setUsername(event.target.value)
  }

  const updateUserName = () => {
    userNameEditToggle()
    if (username) {
    }
    console.log("changed");
  }

  const updateUserProfileImg = () => {
    console.log("changed");
  }

  return (
    <div>
      <Dialog className="userUpdateDialog" open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ bgcolor: "#0F1925", }}>
          <label className="profileImgWrap" style={{
            display: "inline-block",
            position: "relative",
            cursor: "pointer",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            textAlign: "center",
            transform: "translateX(calc(50% + 22.5px))",
            border: "2px solid #fff"
          }}>
            <div style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "url('images/default-profile-img.jpg') center center",
              backgroundSize: "cover"
            }}></div>

            <EditIcon className="profileImgEditIcon" sx={{ display: "none", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#fff", borderRadius: "50%", padding: "10px" }} />
            <input onChange={updateUserProfileImg} type="file" style={{ display: "none" }} />
          </label>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#0F1925"}}>
          <UserNameEditWrap>
            {
              editEnable ?
                <Input
                  value={"Rohim"}
                  onChange={handleValueChange}
                  type={"text"}
                  placeholder={"placeholder"}
                  onBlur={updateUserName}
                  autoFocus
                /> :
                <Typography sx={{ fontSize: "16", color: "#fff" }}>Rohim </Typography>
            }
            {!editEnable && <EditIcon onClick={userNameEditToggle} sx={{ fontSize: "16", color: "#fff", marginLeft: "10px" }} />}
          </UserNameEditWrap>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch)
  }
}

export default connect(null, mapActionsToProps)(UpdateProfileDialog);
