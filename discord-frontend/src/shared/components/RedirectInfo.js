import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const RedirectText = styled("span")({
  display:'inline-block',
  marginTop: '10px',
  color: "#E94B3CFF",
  fontWeight: 700,
  cursor: "pointer",
});

const RedirectInfo = ({
  text,
  redirectText,
  additionalStyles,
  redirectHandler,
}) => {
  return (
    <Typography
      sx={{ color: "#72767d" }}
      style={additionalStyles ? additionalStyles : {}}
      variant="subtitle2"
    >
      {text}
      <RedirectText onClick={redirectHandler}>{redirectText}</RedirectText>
    </Typography>
  );
};

export default RedirectInfo;
