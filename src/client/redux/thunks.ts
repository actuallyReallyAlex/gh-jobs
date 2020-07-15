import { baseGHUrl } from "../constants";
import {
  setJobs,
  setJobsFetchedAt,
  setCurrentJobs,
  setIsLoading,
} from "./actions/application";
import { getData, unique } from "../util";

import { AppThunk, Job, LocationOption, RootState } from "../types";

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
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
  }
};

// TODO - `full_time` doesn't really work on GitHub API
export const searchJobs = (
  search: string,
  locationOptions: LocationOption[]
): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const state: RootState = getState();
  const { fullTime } = state.application;

  const jobs = [];

  const locationsSearches = locationOptions.filter(
    (location: LocationOption) => location.value !== ""
  );

  // * Since location options have to be a thing for the challenge
  // * Make as many requests as locations (since you can only have 1 location per request)
  // * And push all the results into one array
  await Promise.all(
    locationsSearches.map(async (location: LocationOption) => {
      const url = `${baseGHUrl}?full_time=${encodeURI(
        fullTime.toString()
      )}&description=${encodeURI(search)}&location=${encodeURI(
        location.value
      )}`;
      const data = await getData(url);
      jobs.push.apply(jobs, data);
    })
  );

  if (locationsSearches.length === 0) {
    const url = `${baseGHUrl}?full_time=${encodeURI(
      fullTime.toString()
    )}&description=${encodeURI(search)}`;
    const data = await getData(url);
    jobs.push.apply(jobs, data);
  }

  const uniqueJobs = unique(jobs);

  dispatch(setCurrentJobs(uniqueJobs));
  dispatch(setIsLoading(false));
};
