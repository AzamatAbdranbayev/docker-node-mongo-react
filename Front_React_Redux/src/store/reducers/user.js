import {
  CLEAR_ERROR_LOGIN,
  CLEAR_ERROR_REGISTRATION,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCES,
  LOGOUT_USER,
  REGISTRATION_USER_FAIL,
  REGISTRATION_USER_SUCCES,
} from "../actions/User/UserActionTypes";

const initialState = {
  userLogin: null,
  errorLogin: null,
  errorRegistration: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_FAIL:
      return { ...state, errorLogin: action.value };
    case LOGIN_USER_SUCCES:
      return { ...state, userLogin: action.value };
    case CLEAR_ERROR_LOGIN:
      return { ...state, errorLogin: null };
    case CLEAR_ERROR_REGISTRATION:
      return { ...state, errorRegistration: null };
    case REGISTRATION_USER_SUCCES:
      return { ...state, errorRegistration: null };
    case REGISTRATION_USER_FAIL:
      return { ...state, errorRegistration: action.value };
      case LOGOUT_USER:
        return {...state,userLogin:null}
    default:
      return state;
  }
};

export default userReducer;
