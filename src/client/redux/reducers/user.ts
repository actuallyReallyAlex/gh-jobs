import {
  SET_CONFIRM_PASSWORD,
  SET_EDIT_EMAIL,
  SET_EDIT_NAME,
  SET_EMAIL,
  SET_IS_DELETING_PROFILE,
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
  isDeletingProfile: false,
  isEditingProfile: false,
  isLoggedIn: false,
  isResettingPassword: false,
  name: "",
  password: "",
  resetConfirmNewPassword: "",
  resetCurrentPassword: "",
  resetNewPassword: "",
  savedJobs: [],
};

const reducer = (state = initialState, action: UserAction): UserState => {
  let key: string;
  let value;

  if (action && action.payload) {
    key = Object.keys(action.payload)[0];
    value = action.payload[key];
  }

  switch (action.type) {
    case SET_CONFIRM_PASSWORD:
    case SET_EDIT_EMAIL:
    case SET_EDIT_NAME:
    case SET_EMAIL:
    case SET_IS_DELETING_PROFILE:
    case SET_IS_EDITING_PROFILE:
    case SET_IS_LOGGED_IN:
    case SET_IS_RESETTING_PASSWORD:
    case SET_NAME:
    case SET_PASSWORD:
    case SET_RESET_CONFIRM_NEW_PASSWORD:
    case SET_RESET_CURRENT_PASSWORD:
    case SET_RESET_NEW_PASSWORD: {
      return { ...state, [key]: value };
    }
    default:
      return state;
  }
};

export default reducer;
