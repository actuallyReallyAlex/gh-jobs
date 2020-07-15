import {
  SET_CURRENT_JOBS,
  SET_CURRENT_PAGE,
  SET_JOBS,
  SET_JOBS_FETCHED_AT,
} from "../actionTypes";
import { ApplicationAction, ApplicationState } from "../../types";

export const initialState: ApplicationState = {
  currentJobs: [],
  currentPage: 1,
  jobs: [],
  jobsFetchedAt: null,
};

const reducer = (
  state = initialState,
  action: ApplicationAction
): ApplicationState => {
  switch (action.type) {
    case SET_CURRENT_JOBS: {
      return { ...state, currentJobs: action.payload.currentJobs };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.payload.currentPage };
    }
    case SET_JOBS: {
      return { ...state, jobs: action.payload.jobs };
    }
    case SET_JOBS_FETCHED_AT: {
      return { ...state, jobsFetchedAt: action.payload.jobsFetchedAt };
    }
    default:
      return state;
  }
};

export default reducer;
