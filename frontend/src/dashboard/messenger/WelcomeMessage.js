import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  flexGrow: 1,
  height: "100%",
  // height: "calc(100% - 48px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  // backgroundColor: "#EDF0F8",
});

const WelcomeMessage = () => {
  return (
    <Wrapper>
      <img src="images/start-conversation-img.png" style={{height: "auto", width: "30%", opacity: "0.8"}}/>
      <Typography variant="h6" sx={{ color: "#578CFE", marginTop: "30px", fontSize: "14px", textAlign:"center" }}>
        Choose conversation to start messaging!
      </Typography>
    </Wrapper>
  );
};

export default WelcomeMessage;
