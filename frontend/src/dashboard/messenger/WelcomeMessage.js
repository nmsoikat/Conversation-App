import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  flexGrow: 1,
  height: "100%",
  height: "calc(100% - 48px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const WelcomeMessage = () => {
  return (
    <Wrapper>
      <Typography variant="h6" sx={{ color: "#081D34" }}>
        To start chatting - Choose conversation
      </Typography>
    </Wrapper>
  );
};

export default WelcomeMessage;
