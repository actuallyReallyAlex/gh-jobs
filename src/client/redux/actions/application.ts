import {
  SET_JOBS,
  SET_JOBS_FETCHED_AT,
  SET_FULL_TIME,
  SET_IS_LOADING,
  SET_CURRENT_JOBS,
  SET_CURRENT_PAGE,
  SET_LOCATION_SEARCH,
  SET_TOTAL_PAGES,
} from "../actionTypes";

import { Job } from "../../types";

export const setCurrentJobs = (currentJobs: Job[]) => ({
  type: SET_CURRENT_JOBS,
  payload: { currentJobs },
});

export const setCurrentPage = (currentPage: number) => ({
  type: SET_CURRENT_PAGE,
  payload: { currentPage },
});

export const setFullTime = (fullTime: boolean) => ({
  type: SET_FULL_TIME,
  payload: { fullTime },
});

export const setIsLoading = (isLoading: boolean) => ({
  type: SET_IS_LOADING,
  payload: { isLoading },
});

export const setJobs = (jobs: Job[]) => ({ type: SET_JOBS, payload: { jobs } });

export const setJobsFetchedAt = (jobsFetchedAt: string) => ({
  type: SET_JOBS_FETCHED_AT,
  payload: { jobsFetchedAt },
});

export const setLocationSearch = (locationSearch: string) => ({
  type: SET_LOCATION_SEARCH,
  payload: { locationSearch },
});

export const setTotalPages = (totalPages: number) => ({
  type: SET_TOTAL_PAGES,
  payload: { totalPages },
});
