import { Job } from "../../types";
import { SET_JOBS } from "../actionTypes";

export const setJobs = (jobs: Job[]) => ({ type: SET_JOBS, payload: { jobs } });
