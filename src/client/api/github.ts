import { baseGHUrl } from "../constants";

import { Job, LocationOption, SearchType } from "../types";
import { unique } from "../util";

export const getGitHubJobs = async (): Promise<Job[]> => {
  const response = await fetch(`${baseGHUrl}?location=los+angeles`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  const data: Job[] = await response.json();
  return data;
};

const getData = async (url: string): Promise<Job[]> => {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  const data: Job[] = await response.json();
  return data;
};

export const searchJobs = async (
  searchString: string,
  locationOptions: LocationOption[],
  searchType: SearchType,
  fullTime: boolean
): Promise<Job[]> => {
  const jobs = [];

  const locationsSearches = locationOptions.filter(
    (location: LocationOption) => location.value !== ""
  );

  if (searchType === "location") {
    locationsSearches.push({
      name: "locationSearch",
      setter: null,
      value: searchString,
    });
  }

  await Promise.all(
    locationsSearches.map(async (location: LocationOption) => {
      let url = "";
      if (searchType === "description") {
        url = `${baseGHUrl}?full_time=${fullTime}&description=${encodeURI(
          searchString
        )}&location=${encodeURI(location.value)}`;
      } else if (searchType === "location") {
        url = `${baseGHUrl}?full_time=${fullTime}&location=${encodeURI(
          location.value
        )}`;
      }
      const data = await getData(url);
      jobs.push.apply(jobs, data);
    })
  );

  const filteredJobs = jobs.filter((job: Job) => {
    if (fullTime && job.type !== "Full Time") {
      return false;
    } else {
      return true;
    }
  });

  return unique(filteredJobs);
};
