import React from "react";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
});

const Label = styled("p")({
  color: "#fff",
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "16px",
  marginBottom: "8px"
});

const Input = styled("input")({
  flexGrow: 1,
  height: "40px",
  border: "none",
  borderBottom: "1px solid #249FBA",
  // borderRadius: "5px",
  color: "#fff",
  background: "none",
  margin: 0,
  fontSize: "16px",
  padding: "0 5px",
});

const InputWithLabel = (props) => {
  const { value, setValue, label, type, placeholder } = props;

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={handleValueChange}
        type={type}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

export default InputWithLabel;
