import { baseGHUrl } from "../constants";
import {
  setJobs,
  setJobsFetchedAt,
  setCurrentJobs,
} from "./actions/application";

import { AppThunk, Job } from "../types";

export const getJobs = (): AppThunk => async (dispatch, getState) => {
  try {
    const jobs: Job[] = [];
    let jobsInBatch = null;
    let page = 1;

    // * Can only get 50 jobs at a time
    // * keep going until there are no more jobs
    while (jobsInBatch !== 0) {
      const response = await fetch(`${baseGHUrl}?page=${page}`, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      });
      const batchJobs: Job[] = await response.json();
      jobsInBatch = batchJobs.length;
      page++;
      if (jobsInBatch !== 0) {
        jobs.push(...batchJobs);
      }
    }

    const currentJobs = jobs.slice(0, 10);

    dispatch(setJobs(jobs));
    dispatch(setJobsFetchedAt(new Date().toString()));
    dispatch(setCurrentJobs(currentJobs));
  } catch (error) {
    console.error(error);
  }
};
