import { SET_JOBS, SET_JOBS_FETCHED_AT } from "../actionTypes";

import { Job } from "../../types";

export const setJobs = (jobs: Job[]) => ({ type: SET_JOBS, payload: { jobs } });

export const setJobsFetchedAt = (jobsFetchedAt: string) => ({
  type: SET_JOBS_FETCHED_AT,
  payload: { jobsFetchedAt },
});
