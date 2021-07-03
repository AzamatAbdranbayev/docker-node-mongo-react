import {
  CLEAR_ERROR_LOGIN,
  CLEAR_ERROR_REGISTRATION,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCES,
  LOGOUT_USER,
  REGISTRATION_USER_FAIL,
  REGISTRATION_USER_SUCCES,
} from "./UserActionTypes";
import axios from "../../../axios-api";
import { push } from "connected-react-router";
export const clearErrorsRegistration = () => ({
  type: CLEAR_ERROR_REGISTRATION,
});
export const registrationUserSuccess = () => ({
  type: REGISTRATION_USER_SUCCES,
});
export const registrationUserFail = (value) => ({
  type: REGISTRATION_USER_FAIL,
  value,
});

export const fetchRegistrationUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/users", data);
      dispatch(registrationUserSuccess());
      dispatch(push("/login"));
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(registrationUserFail(e.response.data));
      } else {
        dispatch(registrationUserFail({ global: "No internet" }));
      }
    }
  };
};

export const loginUserSucces = (value) => ({ type: LOGIN_USER_SUCCES, value });
export const loginUserFail = (value) => ({ type: LOGIN_USER_FAIL, value });
export const clearErrorLogin = () => ({ type: CLEAR_ERROR_LOGIN });
export const fetchLoginUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/users/sessions", data);
      dispatch(loginUserSucces(response.data));
      dispatch(push("/"));
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(loginUserFail(e.response.data));
      } else {
        dispatch(loginUserFail({ global: "No internet" }));
      }
    }
  };
};

export const logoutUser = () => {
  return async (dispatch,getState)=>{
    const token = getState().user.userLogin.token
    const headers = {"Authorization":token}
    await axios.delete("/users/sessions",{headers})
    dispatch({type:LOGOUT_USER});
    dispatch(push("/"))
  }
}