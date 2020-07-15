import {
  SET_CURRENT_JOBS,
  SET_CURRENT_PAGE,
  SET_FULL_TIME,
  SET_IS_LOADING,
  SET_JOBS,
  SET_JOBS_FETCHED_AT,
  SET_LOCATION_SEARCH,
  SET_TOTAL_PAGES,
} from "../actionTypes";

import { ApplicationAction, ApplicationState } from "../../types";

export const initialState: ApplicationState = {
  currentJobs: [],
  currentPage: 1,
  fullTime: false,
  isLoading: true,
  jobs: [],
  jobsFetchedAt: null,
  locationSearch: "",
  totalPages: 1,
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
    case SET_FULL_TIME: {
      return { ...state, fullTime: action.payload.fullTime };
    }
    case SET_IS_LOADING: {
      return { ...state, isLoading: action.payload.isLoading };
    }
    case SET_JOBS: {
      return { ...state, jobs: action.payload.jobs };
    }
    case SET_JOBS_FETCHED_AT: {
      return { ...state, jobsFetchedAt: action.payload.jobsFetchedAt };
    }
    case SET_LOCATION_SEARCH: {
      return { ...state, locationSearch: action.payload.locationSearch };
    }
    case SET_TOTAL_PAGES: {
      return { ...state, totalPages: action.payload.totalPages };
    }
    default:
      return state;
  }
};

export default reducer;
