import {
  SET_CONFIRM_PASSWORD,
  SET_EMAIL,
  SET_FORM_ERROR,
  SET_IS_LOGGED_IN,
  SET_NAME,
  SET_PASSWORD,
} from "../actionTypes";

import { UserAction, UserState } from "../../types";

export const initialState: UserState = {
  confirmPassword: "",
  email: "",
  formError: "",
  isLoggedIn: false,
  name: "",
  password: "",
};

const reducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case SET_CONFIRM_PASSWORD: {
      return { ...state, confirmPassword: action.payload.confirmPassword };
    }
    case SET_EMAIL: {
      return { ...state, email: action.payload.email };
    }
    case SET_FORM_ERROR: {
      return { ...state, formError: action.payload.formError };
    }
    case SET_IS_LOGGED_IN: {
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    }
    case SET_NAME: {
      return { ...state, name: action.payload.name };
    }
    case SET_PASSWORD: {
      return { ...state, password: action.payload.password };
    }
    default:
      return state;
  }
};

export default reducer;
