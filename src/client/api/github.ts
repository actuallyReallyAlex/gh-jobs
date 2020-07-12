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
