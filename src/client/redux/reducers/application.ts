import { SET_JOBS, SET_JOBS_FETCHED_AT } from "../actionTypes";
import { ApplicationAction, ApplicationState } from "../../types";

export const initialState: ApplicationState = {
  jobs: [],
  jobsFetchedAt: null,
};

const reducer = (
  state = initialState,
  action: ApplicationAction
): ApplicationState => {
  switch (action.type) {
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
