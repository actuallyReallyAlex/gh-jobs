import {
  SET_CONFIRM_PASSWORD,
  SET_EDIT_EMAIL,
  SET_EDIT_NAME,
  SET_EMAIL,
  SET_FORM_ERROR,
  SET_IS_EDITING_PROFILE,
  SET_IS_LOGGED_IN,
  SET_IS_RESETTING_PASSWORD,
  SET_NAME,
  SET_PASSWORD,
  SET_RESET_CONFIRM_NEW_PASSWORD,
  SET_RESET_CURRENT_PASSWORD,
  SET_RESET_NEW_PASSWORD,
} from "../actionTypes";

import { UserAction, UserState } from "../../types";

export const initialState: UserState = {
  confirmPassword: "",
  editEmail: "",
  editName: "",
  email: "",
  formError: "",
  isEditingProfile: false,
  isLoggedIn: false,
  isResettingPassword: false,
  name: "",
  password: "",
  resetConfirmNewPassword: "",
  resetCurrentPassword: "",
  resetNewPassword: "",
};

// TODO - Refactor this. It's doing the same thing each time.
const reducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case SET_CONFIRM_PASSWORD: {
      return { ...state, confirmPassword: action.payload.confirmPassword };
    }
    case SET_EDIT_EMAIL: {
      return { ...state, editEmail: action.payload.editEmail };
    }
    case SET_EDIT_NAME: {
      return { ...state, editName: action.payload.editName };
    }
    case SET_EMAIL: {
      return { ...state, email: action.payload.email };
    }
    case SET_FORM_ERROR: {
      return { ...state, formError: action.payload.formError };
    }
    case SET_IS_EDITING_PROFILE: {
      return { ...state, isEditingProfile: action.payload.isEditingProfile };
    }
    case SET_IS_LOGGED_IN: {
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    }
    case SET_IS_RESETTING_PASSWORD: {
      return {
        ...state,
        isResettingPassword: action.payload.isResettingPassword,
      };
    }
    case SET_NAME: {
      return { ...state, name: action.payload.name };
    }
    case SET_PASSWORD: {
      return { ...state, password: action.payload.password };
    }
    case SET_RESET_CONFIRM_NEW_PASSWORD: {
      return {
        ...state,
        resetConfirmNewPassword: action.payload.resetConfirmNewPassword,
      };
    }
    case SET_RESET_CURRENT_PASSWORD: {
      return {
        ...state,
        resetCurrentPassword: action.payload.resetCurrentPassword,
      };
    }
    case SET_RESET_NEW_PASSWORD: {
      return { ...state, resetNewPassword: action.payload.resetNewPassword };
    }
    default:
      return state;
  }
};

export default reducer;
