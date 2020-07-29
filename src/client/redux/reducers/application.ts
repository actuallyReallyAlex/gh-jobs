import { toast } from "react-toastify";

import {
  DISPLAY_NOTIFICATION,
  SET_CURRENT_JOBS,
  SET_CURRENT_PAGE,
  SET_FULL_TIME,
  SET_IS_LOADING,
  SET_JOBS,
  SET_LOCATION_SEARCH,
  SET_SEARCH_VALUE,
  SET_TOTAL_PAGES,
} from "../actionTypes";

import { ApplicationAction, ApplicationState } from "../../types";

export const initialState: ApplicationState = {
  currentJobs: [],
  currentPage: 1,
  fullTime: false,
  isLoading: true,
  jobs: [],
  locationSearch: "",
  notificationMessage: "",
  notificationType: "default",
  searchValue: "",
  totalPages: 1,
};

const reducer = (
  state = initialState,
  action: ApplicationAction
): ApplicationState => {
  let key: string;
  let value;

  if (action && action.payload) {
    key = Object.keys(action.payload)[0];
    value = action.payload[key];
  }

  switch (action.type) {
    case DISPLAY_NOTIFICATION: {
      const { notificationMessage, notificationType } = action.payload;
      if (notificationMessage) {
        const autoClose =
          notificationType !== "error" || notificationType !== "warning"
            ? false
            : 5000;
        toast(notificationMessage, {
          autoClose,
          type: notificationType,
        });
      }

      return {
        ...state,
        notificationMessage,
        notificationType,
      };
    }
    case SET_CURRENT_JOBS:
    case SET_CURRENT_PAGE:
    case SET_FULL_TIME:
    case SET_IS_LOADING:
    case SET_JOBS:
    case SET_LOCATION_SEARCH:
    case SET_SEARCH_VALUE:
    case SET_TOTAL_PAGES: {
      return { ...state, [key]: value };
    }
    default:
      return state;
  }
};

export default reducer;
