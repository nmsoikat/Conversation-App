import React from "react";
import { styled } from "@mui/system";
import DropdownMenu from "./DropdownMenu";
import ChosenOptionLabel from "./ChosenOptionLabel";

const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "48px",
  borderBottom: "1px solid black",
  backgroundColor: "#2F3136",
  width: "calc(100% - 102px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
  zIndex: "0"
});

const AppBar = () => {
  return (
    <MainContainer>
      <ChosenOptionLabel />
      <DropdownMenu />
    </MainContainer>
  );
};

export default AppBar;
