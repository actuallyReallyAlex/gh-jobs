import {
  SET_CONFIRM_PASSWORD,
  SET_EMAIL,
  SET_FORM_ERROR,
  SET_IS_LOGGED_IN,
  SET_IS_RESETTING_PASSWORD,
  SET_NAME,
  SET_PASSWORD,
  SET_RESET_CONFIRM_NEW_PASSWORD,
  SET_RESET_CURRENT_PASSWORD,
  SET_RESET_NEW_PASSWORD,
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

export const setIsResettingPassword = (
  isResettingPassword: boolean
): UserAction => ({
  type: SET_IS_RESETTING_PASSWORD,
  payload: { isResettingPassword },
});

export const setName = (name: string): UserAction => ({
  type: SET_NAME,
  payload: { name },
});

export const setPassword = (password: string): UserAction => ({
  type: SET_PASSWORD,
  payload: { password },
});

export const setResetConfirmNewPassword = (
  resetConfirmNewPassword: string
): UserAction => ({
  type: SET_RESET_CONFIRM_NEW_PASSWORD,
  payload: { resetConfirmNewPassword },
});

export const setResetCurrentPassword = (
  resetCurrentPassword: string
): UserAction => ({
  type: SET_RESET_CURRENT_PASSWORD,
  payload: { resetCurrentPassword },
});

export const setResetNewPassword = (resetNewPassword: string): UserAction => ({
  type: SET_RESET_NEW_PASSWORD,
  payload: { resetNewPassword },
});
