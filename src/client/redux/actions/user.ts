import {
  SET_CONFIRM_PASSWORD,
  SET_EMAIL,
  SET_IS_LOGGED_IN,
  SET_PASSWORD,
} from "../actionTypes";

import { UserAction } from "../../types";

export const setConfirmPassword = (confirmPassword: string): UserAction => ({
  type: SET_CONFIRM_PASSWORD,
  payload: { confirmPassword },
});

export const setEmail = (email: string): UserAction => ({
  type: SET_EMAIL,
  payload: { email },
});

export const setIsLoggedIn = (isLoggedIn: boolean): UserAction => ({
  type: SET_IS_LOGGED_IN,
  payload: { isLoggedIn },
});

export const setPassword = (password: string): UserAction => ({
  type: SET_PASSWORD,
  payload: { password },
});
