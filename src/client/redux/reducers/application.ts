import { toast } from "react-toastify";

import {
  DISPLAY_NOTIFICATION,
  SET_CURRENT_JOBS,
  SET_CURRENT_PAGE,
  SET_ERROR,
  SET_FULL_TIME,
  SET_IS_LOADING,
  SET_IS_MODAL_OPEN,
  SET_JOB_DETAILS,
  SET_JOBS,
  SET_LOCATION_SEARCH,
  SET_MODAL_CONTENT,
  SET_MODAL_TITLE,
  SET_SEARCH_VALUE,
  SET_TOTAL_PAGES,
} from "../actionTypes";

import { ApplicationAction, ApplicationState } from "../../types";

export const initialState: ApplicationState = {
  currentJobs: [],
  currentPage: 1,
  error: null,
  fullTime: false,
  isLoading: true,
  isModalOpen: false,
  jobDetails: null,
  jobs: [],
  locationSearch: "",
  modalContent: null,
  modalTitle: "",
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
        let autoClose: boolean | number = 5000;
        if (notificationType === "error" || notificationType === "warning") {
          autoClose = false;
        }
        toast(notificationMessage, {
          autoClose,
          toastId: "notification",
          type: notificationType,
        });
      } else {
        // * If displayNotification() is called with `notificationMessage` === "",
        // * Clear all notifications
        toast.dismiss();
      }

      return {
        ...state,
        notificationMessage,
        notificationType,
      };
    }
    case SET_ERROR: {
      if (!action.payload.error && !action.payload.componentStack) {
        return { ...state, error: null };
      }

      return {
        ...state,
        error: {
          error: {
            message: action.payload.error.message,
            name: action.payload.error.name,
            stack: action.payload.error.stack,
          },
          componentStack: action.payload.componentStack,
        },
      };
    }
    case SET_CURRENT_JOBS:
    case SET_CURRENT_PAGE:
    case SET_FULL_TIME:
    case SET_IS_LOADING:
    case SET_IS_MODAL_OPEN:
    case SET_JOB_DETAILS:
    case SET_JOBS:
    case SET_LOCATION_SEARCH:
    case SET_MODAL_CONTENT:
    case SET_MODAL_TITLE:
    case SET_SEARCH_VALUE:
    case SET_TOTAL_PAGES: {
      return { ...state, [key]: value };
    }
    default:
      return state;
  }
};

export default reducer;
