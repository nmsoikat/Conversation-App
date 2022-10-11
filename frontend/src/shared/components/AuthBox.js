import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const BoxWrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1B2B41",
  backgroundImage: "url('images/auth-box-bg.jpg')",
  backgroundRepeat: "repeat-x",
  backgroundSize: 'cover'
});

const AuthBox = (props) => {
  return (
    <BoxWrapper>
      <Box
        sx={{
          width: 700,
          height: 425,
          bgcolor: "#0F1925",
          borderRadius: "10px",
          boxShadow: "0 2px 10px 0 rgb(255 255 255 / 40%)",
          display: "flex",
          flexDirection: "column",
          padding: "25px",
        }}
      >
        {props.children}
      </Box>
    </BoxWrapper>
  );
};

export default AuthBox;
