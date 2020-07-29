import {
  DISPLAY_NOTIFICATION,
  SET_JOBS,
  SET_FULL_TIME,
  SET_IS_LOADING,
  SET_CURRENT_JOBS,
  SET_CURRENT_PAGE,
  SET_LOCATION_SEARCH,
  SET_SEARCH_VALUE,
  SET_TOTAL_PAGES,
} from "../actionTypes";

import { ApplicationAction, Job, NotificationType } from "../../types";

export const displayNotification = (
  notificationMessage: string,
  notificationType: NotificationType
): ApplicationAction => ({
  type: DISPLAY_NOTIFICATION,
  payload: { notificationMessage, notificationType },
});

export const setCurrentJobs = (currentJobs: Job[]): ApplicationAction => ({
  type: SET_CURRENT_JOBS,
  payload: { currentJobs },
});

export const setCurrentPage = (currentPage: number): ApplicationAction => ({
  type: SET_CURRENT_PAGE,
  payload: { currentPage },
});

export const setFullTime = (fullTime: boolean): ApplicationAction => ({
  type: SET_FULL_TIME,
  payload: { fullTime },
});

export const setIsLoading = (isLoading: boolean): ApplicationAction => ({
  type: SET_IS_LOADING,
  payload: { isLoading },
});

export const setJobs = (jobs: Job[]): ApplicationAction => ({
  type: SET_JOBS,
  payload: { jobs },
});

export const setLocationSearch = (
  locationSearch: string
): ApplicationAction => ({
  type: SET_LOCATION_SEARCH,
  payload: { locationSearch },
});

export const setSearchValue = (searchValue: string): ApplicationAction => ({
  type: SET_SEARCH_VALUE,
  payload: { searchValue },
});

export const setTotalPages = (totalPages: number): ApplicationAction => ({
  type: SET_TOTAL_PAGES,
  payload: { totalPages },
});
