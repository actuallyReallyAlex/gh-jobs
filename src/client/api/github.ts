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
  searchType: SearchType
): Promise<Job[]> => {
  const jobs = [];

  const locationsSearches = locationOptions.filter(
    (location: LocationOption) => location.value !== ""
  );

  await Promise.all(
    locationsSearches.map(async (location: LocationOption) => {
      let url = "";
      if (searchType === "description") {
        url = `${baseGHUrl}?description=${encodeURI(
          searchString
        )}&location=${encodeURI(location.value)}`;
      } else if (searchType === "location") {
        url = `${baseGHUrl}?location=${encodeURI(
          searchString + " " + location.value
        )}`;
      }
      const data = await getData(url);
      jobs.push.apply(jobs, data);
    })
  );

  return unique(jobs);
};
