import {
  SET_JOBS,
  SET_JOBS_FETCHED_AT,
  SET_CURRENT_JOBS,
  SET_CURRENT_PAGE,
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

export const setJobs = (jobs: Job[]) => ({ type: SET_JOBS, payload: { jobs } });

export const setJobsFetchedAt = (jobsFetchedAt: string) => ({
  type: SET_JOBS_FETCHED_AT,
  payload: { jobsFetchedAt },
});
