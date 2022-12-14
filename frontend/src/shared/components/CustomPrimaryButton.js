import React from "react";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';

const CustomPrimaryButton = ({
  label,
  additionalStyles,
  disabled,
  onClick,
  isLoading
}) => {
  return (
    <Button
      variant="outline"
      sx={{
        backgroundColor: disabled ? "none" : "#249FBA",
        color: "white",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 500,
        width: "100%",
        height: "40px",
        border: "1px solid #249FBA"
      }}
      style={additionalStyles ? additionalStyles : {}}
      // disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? <CircularProgress sx={{ width: '25px !important', height: '25px !important' }} color="inherit" /> : label}
    </Button>
  );
};

const mapStateStoreToProps = ({ auth }) => {
  return {
    ...auth
  }
}

export default connect(mapStateStoreToProps)(CustomPrimaryButton);
