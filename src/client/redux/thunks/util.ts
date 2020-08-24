import { displayNotification, setRedirectPath } from "../actions/application";
import {
  setIsModalOpen,
  setModalContent,
  setModalTitle,
} from "../actions/modal";
import {
  setEmail,
  setHiddenJobs,
  setId,
  setIsLoggedIn,
  setName,
  setSavedJobs,
} from "../actions/user";

import { AppThunk, ErrorResponse } from "../../types";

export const authenticationRedirect = (): AppThunk => async (dispatch) => {
  dispatch(setRedirectPath("/login"));
  dispatch(setEmail(""));
  dispatch(setName(""));
  dispatch(setId(""));
  dispatch(setSavedJobs([]));
  dispatch(setHiddenJobs([]));
  dispatch(setIsModalOpen(false));
  dispatch(setModalContent(""));
  dispatch(setModalTitle(""));
  dispatch(displayNotification("Please authenticate.", "error"));
};

export const globalErrorHandler = (
  response: ErrorResponse,
  authenticatedRequest?: boolean
): AppThunk => (dispatch) => {
  if (authenticatedRequest) {
    if (response.error === "Please authenticate.") {
      // * Clear User and Redirect to Login
      dispatch(authenticationRedirect());
      return;
    }
  }
  dispatch(displayNotification(response.error, "error"));
};

export const resetState = (): AppThunk => (dispatch) => {
  // * Application
  dispatch(displayNotification("", "default"));
  // * Modal
  dispatch(setIsModalOpen(false));
  dispatch(setModalContent(""));
  dispatch(setModalTitle(""));
  // * User
  dispatch(setEmail(""));
  dispatch(setHiddenJobs([]));
  dispatch(setId(""));
  dispatch(setIsLoggedIn(false));
  dispatch(setName(""));
  dispatch(setSavedJobs([]));
};
