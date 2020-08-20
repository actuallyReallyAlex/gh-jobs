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

import { UserAction, Job } from "../../types";

export const setEmail = (email: string): UserAction => ({
  type: SET_EMAIL,
  payload: { email },
});

export const setHiddenJobs = (hiddenJobs: string[]): UserAction => ({
  type: SET_HIDDEN_JOBS,
  payload: { hiddenJobs },
});

export const setHiddenJobsDetails = (hiddenJobsDetails: Job[]): UserAction => ({
  type: SET_HIDDEN_JOBS_DETAILS,
  payload: { hiddenJobsDetails },
});

export const setId = (id: string): UserAction => ({
  type: SET_ID,
  payload: { id },
});

export const setIsEditingProfile = (isEditingProfile: boolean): UserAction => ({
  type: SET_IS_EDITING_PROFILE,
  payload: { isEditingProfile },
});

export const setIsLoggedIn = (isLoggedIn: boolean): UserAction => ({
  type: SET_IS_LOGGED_IN,
  payload: { isLoggedIn },
});

export const setName = (name: string): UserAction => ({
  type: SET_NAME,
  payload: { name },
});

export const setSavedJobs = (savedJobs: string[]): UserAction => ({
  type: SET_SAVED_JOBS,
  payload: { savedJobs },
});

export const setSavedJobsCurrentPage = (
  savedJobsCurrentPage: number
): UserAction => ({
  type: SET_SAVED_JOBS_CURRENT_PAGE,
  payload: { savedJobsCurrentPage },
});

export const setSavedJobsDetails = (savedJobsDetails: Job[]): UserAction => ({
  type: SET_SAVED_JOBS_DETAILS,
  payload: { savedJobsDetails },
});

export const setSavedJobsTotalPages = (
  savedJobsTotalPages: number
): UserAction => ({
  type: SET_SAVED_JOBS_TOTAL_PAGES,
  payload: { savedJobsTotalPages },
});
