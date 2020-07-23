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
  SET_SAVED_JOBS,
} from "../actionTypes";

import { Job, UserAction } from "../../types";

export const setConfirmPassword = (confirmPassword: string): UserAction => ({
  type: SET_CONFIRM_PASSWORD,
  payload: { confirmPassword },
});

export const setEditEmail = (editEmail: string): UserAction => ({
  type: SET_EDIT_EMAIL,
  payload: { editEmail },
});

export const setEditName = (editName: string): UserAction => ({
  type: SET_EDIT_NAME,
  payload: { editName },
});

export const setEmail = (email: string): UserAction => ({
  type: SET_EMAIL,
  payload: { email },
});

export const setIsDeletingProfile = (
  isDeletingProfile: boolean
): UserAction => ({
  type: SET_IS_DELETING_PROFILE,
  payload: { isDeletingProfile },
});

export const setIsEditingProfile = (isEditingProfile: boolean): UserAction => ({
  type: SET_IS_EDITING_PROFILE,
  payload: { isEditingProfile },
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

export const setSavedJobs = (savedJobs: Job[]): UserAction => ({
  type: SET_SAVED_JOBS,
  payload: { savedJobs },
});
