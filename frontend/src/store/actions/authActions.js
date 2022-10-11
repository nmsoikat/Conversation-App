import * as api from "../../api";
import { openAlertMessage } from "./alertActions";

export const authActions = {
  SET_LOADING: "AUTH.SET_LOADING",
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, navigate) =>
      dispatch(register(userDetails, navigate)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const setLoading = (isLoading) => {
  return {
    type: authActions.SET_LOADING,
    isLoading,
  };
};

const login = (userDetails, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const response = await api.login(userDetails);
    dispatch(setLoading(false));
    //console.log(response);
    if (response.error) {
      let errMessage = response?.exception?.response?.data;
      dispatch(openAlertMessage(errMessage ? errMessage : 'Internal server error'));
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem("user", JSON.stringify(userDetails));

      dispatch(setUserDetails(userDetails));
      navigate("/dashboard");
    }
  };
};

const register = (userDetails, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const response = await api.register(userDetails);
    dispatch(setLoading(false));
    //console.log(response);
    if (response.error) {
      let errMessage = response?.exception?.response?.data;
      dispatch(openAlertMessage(errMessage ? errMessage : 'Internal server error'));
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem("user", JSON.stringify(userDetails));

      dispatch(setUserDetails(userDetails));
      navigate("/dashboard");
    }
  };
};