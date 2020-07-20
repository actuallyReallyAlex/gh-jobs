import {
  SET_CONFIRM_PASSWORD,
  SET_EMAIL,
  SET_FORM_ERROR,
  SET_IS_LOGGED_IN,
  SET_NAME,
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

export const setFormError = (formError: string): UserAction => ({
  type: SET_FORM_ERROR,
  payload: { formError },
});

export const setIsLoggedIn = (isLoggedIn: boolean): UserAction => ({
  type: SET_IS_LOGGED_IN,
  payload: { isLoggedIn },
});

export const setName = (name: string): UserAction => ({
  type: SET_NAME,
  payload: { name },
});

export const setPassword = (password: string): UserAction => ({
  type: SET_PASSWORD,
  payload: { password },
});
