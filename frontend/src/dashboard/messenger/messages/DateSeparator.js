import React from "react";
import { styled } from "@mui/system";

const Separator = styled("div")({
  width: "100%",
  backgroundColor: "#b9bbbe",
  height: "1px",
  position: "relative",
  marginTop: "20px",
  marginBottom: "10px",
});

const DateLabel = styled("span")({
  backgroundColor: "#EDF0F8",
  border:"1px solid #b9bbbe",
  borderRadius: "5px",
  position: "absolute",
  left: "47%",
  top: "-10px",
  color: "#b9bbbe",
  padding: "0 5px",
  fontSize: "14px",
});

const DateSeparator = ({ date }) => {
  return (
    <Separator>
      <DateLabel>{date}</DateLabel>
    </Separator>
  );
};

export default DateSeparator;
