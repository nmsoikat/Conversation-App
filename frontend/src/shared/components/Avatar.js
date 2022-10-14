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
});

const Avatar = ({ username, large, profileImg }) => {
  const style = {
    borderRadius: "50%",
    backgroundImage: `url("upload/${profileImg ? profileImg : 'default-profile-img.png'}")`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  }

  if (large) {
    style.height = "80px";
    style.width = "80px"
  }


  return (
    <AvatarPreview style={style}>
        {/* username?.substring(0, 2) */}
    </AvatarPreview>
  );
};

export default Avatar;
