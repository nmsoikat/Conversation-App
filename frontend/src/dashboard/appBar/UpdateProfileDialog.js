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
  closeDialogHandler,
  updateUserName,
  updateProfileImage,
  userDetails
}) => {
  const [username, setUsername] = useState("");
  const [editEnable, setEditEnable] = useState(false);

  useEffect(() => {
    setUsername(userDetails?.username)
  }, [userDetails?.username])

  const handleCloseDialog = () => {
    closeDialogHandler();
  };

  const userNameEditToggle = () => {
    setEditEnable(!editEnable)
  }

  const handleValueChange = (event) => {
    setUsername(event.target.value)
  }

  //update onBlur
  const updateName = async () => {
    userNameEditToggle()
    if (username) {
      await updateUserName({ userId: userDetails._id, username })
    }
  }
  //update onKeyDown
  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      updateName()
    }
  }

  const updateUserProfileImg = async (event) => {
    const formData = new FormData();
    formData.append("userId", userDetails._id)
    formData.append("profileImg",event.target.files[0])
    await updateProfileImage(formData)
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
              background: `url("upload/${userDetails.profileImg ? userDetails.profileImg : 'default-profile-img.png'}")`,
              backgroundSize: "cover",
              backgroundPosition: "center center"
            }}></div>

            <EditIcon className="profileImgEditIcon" sx={{ display: "none", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#fff", borderRadius: "50%", padding: "10px" }} />
            <input onChange={updateUserProfileImg} type="file" style={{ display: "none" }} />
          </label>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#0F1925" }}>
          <UserNameEditWrap>
            {
              editEnable ?
                <Input
                  value={username}
                  onChange={handleValueChange}
                  type="text"
                  placeholder="Please type your name"
                  onBlur={updateName}
                  onKeyDown={handleKeyPressed}
                  autoFocus
                /> :
                <Typography sx={{ fontSize: "16", color: "#fff" }}>{username}</Typography>
            }
            {!editEnable && <EditIcon onClick={userNameEditToggle} sx={{ fontSize: "16", color: "#fff", marginLeft: "10px" }} />}
          </UserNameEditWrap>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStoreStateToProps = ({ auth }) => {
  return {
    ...auth
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch)
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(UpdateProfileDialog);
