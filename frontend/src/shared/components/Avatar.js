import React from "react";
import { styled } from "@mui/system";

const AvatarPreview = styled("div")({
  height: "42px",
  width: "42px",
  backgroundColor: "#578CFE",
  borderRadius: "42px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "700",
  marginLeft: "5px",
  color: "white",
  flexShrink: 0
});

const Avatar = ({ username, large, isMeetingRoom, profileImg }) => {
  const style = {
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  }

  if (!isMeetingRoom) {
    style.backgroundImage = `url("${profileImg ? process.env.REACT_APP_API_IMAGE_URL + '/' + profileImg : 'images/default-profile-img.png'}")`
  }

  if (large) {
    style.height = "80px";
    style.width = "80px"
  }


  return (
    <AvatarPreview style={style}>
      {isMeetingRoom && username?.substring(0, 2)}
    </AvatarPreview>
  );
};

export default Avatar;
