import {
  DISPLAY_NOTIFICATION,
  SET_CONTRACT,
  SET_CURRENT_JOBS,
  SET_CURRENT_PAGE,
  SET_ERROR,
  SET_FULL_TIME,
  SET_IS_LOADING,
  SET_JOB_DETAILS,
  SET_JOBS,
  SET_LOCATION_SEARCH,
  SET_REDIRECT_PATH,
  SET_SEARCH_VALUE,
  SET_TOTAL_PAGES,
} from "../actionTypes";

import { Job, NotificationType, ReduxAction } from "../../types";

export const displayNotification = (
  notificationMessage: string,
  notificationType: NotificationType
): ReduxAction => ({
  type: DISPLAY_NOTIFICATION,
  payload: { notificationMessage, notificationType },
});

export const setContract = (contract: boolean): ReduxAction => ({
  type: SET_CONTRACT,
  payload: { contract },
});

export const setCurrentJobs = (currentJobs: Job[]): ReduxAction => ({
  type: SET_CURRENT_JOBS,
  payload: { currentJobs },
});

export const setCurrentPage = (currentPage: number): ReduxAction => ({
  type: SET_CURRENT_PAGE,
  payload: { currentPage },
});

export const setError = (
  error: Error,
  componentStack: string
): ReduxAction => ({
  type: SET_ERROR,
  payload: { error, componentStack },
});

export const setFullTime = (fullTime: boolean): ReduxAction => ({
  type: SET_FULL_TIME,
  payload: { fullTime },
});

export const setIsLoading = (isLoading: boolean): ReduxAction => ({
  type: SET_IS_LOADING,
  payload: { isLoading },
});

export const setJobDetails = (jobDetails: Job): ReduxAction => ({
  type: SET_JOB_DETAILS,
  payload: { jobDetails },
});

export const setJobs = (jobs: Job[]): ReduxAction => ({
  type: SET_JOBS,
  payload: { jobs },
});

export const setLocationSearch = (locationSearch: string): ReduxAction => ({
  type: SET_LOCATION_SEARCH,
  payload: { locationSearch },
});

export const setRedirectPath = (redirectPath: string): ReduxAction => ({
  type: SET_REDIRECT_PATH,
  payload: { redirectPath },
});

export const setSearchValue = (searchValue: string): ReduxAction => ({
  type: SET_SEARCH_VALUE,
  payload: { searchValue },
});

export const setTotalPages = (totalPages: number): ReduxAction => ({
  type: SET_TOTAL_PAGES,
  payload: { totalPages },
});
