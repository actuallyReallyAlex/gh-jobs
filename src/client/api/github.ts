import { baseGHUrl } from "../constants";

import { Job } from "../types";

export const getGitHubJobs = async (): Promise<Job[]> => {
  const response = await fetch(`${baseGHUrl}?location=los+angeles`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  const data: Job[] = await response.json();
  return data;
};

export const searchJobs = async (searchString: string): Promise<Job[]> => {
  const response = await fetch(
    `${baseGHUrl}?description=${encodeURI(searchString)}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    }
  );
  const data: Job[] = await response.json();
  return data;
};

export const locationSearchJobs = async (
  locationSearchString: string
): Promise<Job[]> => {
  const response = await fetch(
    `${baseGHUrl}?location=${encodeURI(locationSearchString)}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    }
  );
  const data: Job[] = await response.json();
  return data;
};

export const getAllGitHubJobs = async (): Promise<Job[]> => {
  const jobs = [];

  for (let i = 1; i < 11; i++) {
    const response = await fetch(`${baseGHUrl}?page=${i}`, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });
    const data: Job[] = await response.json();
    jobs.push.apply(jobs, data);
  }
  return jobs;
};
