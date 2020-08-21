import {
  SET_EMAIL,
  SET_HIDDEN_JOBS,
  SET_HIDDEN_JOBS_DETAILS,
  SET_ID,
  SET_IS_EDITING_PROFILE,
  SET_IS_LOGGED_IN,
  SET_NAME,
  SET_SAVED_JOBS,
  SET_SAVED_JOBS_CURRENT_PAGE,
  SET_SAVED_JOBS_DETAILS,
  SET_SAVED_JOBS_TOTAL_PAGES,
} from "../actionTypes";

import { ReduxAction, UserState } from "../../types";

export const initialState: UserState = {
  email: "",
  hiddenJobs: [],
  hiddenJobsDetails: [],
  id: "",
  isEditingProfile: false,
  isLoggedIn: false,
  name: "",
  savedJobs: [],
  savedJobsCurrentPage: 1,
  savedJobsDetails: [],
  savedJobsTotalPages: 1,
};

const reducer = (state = initialState, action: ReduxAction): UserState => {
  let key: string;
  let value;

  if (action && action.payload) {
    key = Object.keys(action.payload)[0];
    value = action.payload[key];
  }

  switch (action.type) {
    case SET_EMAIL:
    case SET_HIDDEN_JOBS:
    case SET_HIDDEN_JOBS_DETAILS:
    case SET_ID:
    case SET_IS_EDITING_PROFILE:
    case SET_IS_LOGGED_IN:
    case SET_NAME:
    case SET_SAVED_JOBS:
    case SET_SAVED_JOBS_CURRENT_PAGE:
    case SET_SAVED_JOBS_DETAILS:
    case SET_SAVED_JOBS_TOTAL_PAGES: {
      return { ...state, [key]: value };
    }
    default:
      return state;
  }
};

export default reducer;
