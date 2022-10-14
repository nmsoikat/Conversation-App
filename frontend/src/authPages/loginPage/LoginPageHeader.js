import React from "react";
import { Typography } from "@mui/material";

const LoginPageHeader = () => {
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", color: "#249FBA"}}>
        LOGIN
      </Typography>
      {/* <Typography sx={{ color: "#249FBA" }}>
        We are happy that you are with us!
      </Typography> */}
    </>
  );
};

export default LoginPageHeader;
