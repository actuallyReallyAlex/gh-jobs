import { baseGHUrl } from "../constants";
import {
  setJobs,
  setJobsFetchedAt,
  setCurrentJobs,
  setIsLoading,
  setCurrentPage,
  setTotalPages,
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
      const batchJobs = await getData(`${baseGHUrl}?page=${page}`);
      jobsInBatch = batchJobs.length;
      page++;
      if (jobsInBatch !== 0) {
        jobs.push(...batchJobs);
      }
    }

    dispatch(setJobs(jobs));
    dispatch(setJobsFetchedAt(new Date().toString()));
    dispatch(setCurrentPage(1));
    dispatch(setTotalPages(Math.ceil(jobs.length / 5)));
    dispatch(setCurrentJobs(jobs));
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
  const { fullTime, locationSearch } = state.application;

  const jobs = [];

  const locationsSearches = locationOptions.filter(
    (location: LocationOption) => location.value !== ""
  );

  if (locationSearch) {
    locationsSearches.push({
      name: "locationSearch",
      setter: null,
      value: locationSearch,
    });
  }

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
  dispatch(setCurrentPage(1));
  dispatch(setTotalPages(Math.ceil(uniqueJobs.length / 5)));
  dispatch(setIsLoading(false));
};

export const pagination = (pageNumber: number): AppThunk => (
  dispach,
  getState
) => {
  dispach(setCurrentPage(pageNumber));
};
