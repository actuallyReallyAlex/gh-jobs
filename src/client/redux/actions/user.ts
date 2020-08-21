import {
  SET_EMAIL,
  SET_HIDDEN_JOBS,
  SET_HIDDEN_JOBS_DETAILS,
  SET_ID,
  SET_IS_EDITING_PROFILE,
  SET_IS_LOGGED_IN,
  SET_NAME,
  SET_SAVED_JOBS,
  SET_SAVED_JOBS_CURRENT_PAGE,
  SET_SAVED_JOBS_DETAILS,
  SET_SAVED_JOBS_TOTAL_PAGES,
} from "../actionTypes";

import { Job, ReduxAction } from "../../types";

export const setEmail = (email: string): ReduxAction => ({
  type: SET_EMAIL,
  payload: { email },
});

export const setHiddenJobs = (hiddenJobs: string[]): ReduxAction => ({
  type: SET_HIDDEN_JOBS,
  payload: { hiddenJobs },
});

export const setHiddenJobsDetails = (
  hiddenJobsDetails: Job[]
): ReduxAction => ({
  type: SET_HIDDEN_JOBS_DETAILS,
  payload: { hiddenJobsDetails },
});

export const setId = (id: string): ReduxAction => ({
  type: SET_ID,
  payload: { id },
});

export const setIsEditingProfile = (
  isEditingProfile: boolean
): ReduxAction => ({
  type: SET_IS_EDITING_PROFILE,
  payload: { isEditingProfile },
});

export const setIsLoggedIn = (isLoggedIn: boolean): ReduxAction => ({
  type: SET_IS_LOGGED_IN,
  payload: { isLoggedIn },
});

export const setName = (name: string): ReduxAction => ({
  type: SET_NAME,
  payload: { name },
});

export const setSavedJobs = (savedJobs: string[]): ReduxAction => ({
  type: SET_SAVED_JOBS,
  payload: { savedJobs },
});

export const setSavedJobsCurrentPage = (
  savedJobsCurrentPage: number
): ReduxAction => ({
  type: SET_SAVED_JOBS_CURRENT_PAGE,
  payload: { savedJobsCurrentPage },
});

export const setSavedJobsDetails = (savedJobsDetails: Job[]): ReduxAction => ({
  type: SET_SAVED_JOBS_DETAILS,
  payload: { savedJobsDetails },
});

export const setSavedJobsTotalPages = (
  savedJobsTotalPages: number
): ReduxAction => ({
  type: SET_SAVED_JOBS_TOTAL_PAGES,
  payload: { savedJobsTotalPages },
});
