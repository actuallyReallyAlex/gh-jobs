import {
  displayNotification,
  setCurrentJobs,
  setCurrentPage,
  setIsLoading,
  setJobs,
  setSearchValue,
  setTotalPages,
  setJobDetails,
  setError,
  setFullTime,
  setLocationSearch,
} from "./actions/application";
import {
  setConfirmPassword,
  setEditEmail,
  setEditName,
  setEmail,
  setIsDeletingProfile,
  setIsEditingProfile,
  setIsLoggedIn,
  setIsViewingSavedJobs,
  setIsResettingPassword,
  setName,
  setPassword,
  setResetConfirmNewPassword,
  setResetCurrentPassword,
  setResetNewPassword,
  setSavedJobs,
  setSavedJobsCurrentPage,
  setSavedJobsDetails,
  setSavedJobsTotalPages,
} from "./actions/user";
import { fetchServerData, isError } from "../util";

import {
  AppThunk,
  DeleteProfileResponse,
  EditProfileResponse,
  GetJobsErrorResponse,
  GetJobsSuccessResponse,
  GetSavedJobsDetailsErrorResponse,
  GetSavedJobsDetailsSuccessResponse,
  Job,
  LocationOption,
  LoginResponse,
  ResetPasswordResponse,
  RootState,
  ServerResponseUser,
  AddSavedJobErrorResponse,
  AddSavedJobSuccessResponse,
  SignupErrorResponse,
  SignupSuccessResponse,
  RemoveSavedJobErrorResponse,
  RemoveSavedJobSuccessResponse,
} from "../types";

export const getJobs = (): AppThunk => async (dispatch) => {
  try {
    const result = (await fetchServerData("/jobs", "GET")) as
      | GetJobsErrorResponse
      | GetJobsSuccessResponse;

    if (isError(result)) {
      dispatch(displayNotification(result.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setJobs(result));
    dispatch(setCurrentPage(1));
    dispatch(setTotalPages(Math.ceil(result.length / 5)));
    dispatch(setCurrentJobs(result));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
  }
};

export const searchJobs = (
  search: string,
  locationOptions: LocationOption[]
): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));
  dispatch(setSearchValue(search));

  const state: RootState = getState();
  const { fullTime, locationSearch } = state.application;

  const locationsSearches = locationOptions.filter(
    (location: LocationOption) => location.value !== ""
  );

  if (locationSearch) {
    locationsSearches.push({
      name: "locationSearch",
      setter: null,
      value: locationSearch,
    });
  }

  let url = `/jobs/search?full_time=${encodeURI(
    fullTime.toString()
  )}&description=${encodeURI(search)}`;

  locationsSearches.forEach((locationSearch: LocationOption, i: number) => {
    url = url + `&location${i + 1}=${encodeURI(locationSearch.value)}`;
  });

  const data = (await fetchServerData(url, "GET")) as
    | GetJobsErrorResponse
    | GetJobsSuccessResponse;

  if (isError(data)) {
    dispatch(displayNotification(data.error, "error"));
    dispatch(setIsLoading(false));
    return;
  }

  dispatch(setCurrentJobs(data));
  dispatch(setCurrentPage(1));
  dispatch(setTotalPages(Math.ceil(data.length / 5)));
  dispatch(
    displayNotification(`Search returned ${data.length} results.`, "success")
  );
  dispatch(setIsLoading(false));
};

export const pagination = (pageNumber: number): AppThunk => (dispatch) => {
  dispatch(setCurrentPage(pageNumber));
};

export const logIn = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  const { user } = getState();
  const { email, password } = user;

  // TODO - Modify
  const response: LoginResponse = await fetchServerData(
    "/user/login",
    "POST",
    JSON.stringify({ email, password })
  );

  if (response.error) {
    dispatch(displayNotification(response.error, "error"));
    dispatch(setIsLoading(false));
    return;
  }

  dispatch(setIsLoggedIn(true));
  dispatch(setEmail(response.email));
  dispatch(setName(response.name));
  dispatch(setSavedJobs(response.savedJobs));

  dispatch(setIsLoading(false));
};

export const signup = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  const { user } = getState();
  const { confirmPassword, email, name, password } = user;

  if (confirmPassword !== password) {
    dispatch(displayNotification("Passwords do not match.", "error"));
    dispatch(setIsLoading(false));
    return;
  }

  // TODO - Modify
  const result:
    | SignupErrorResponse
    | SignupSuccessResponse = await fetchServerData(
    "/user",
    "POST",
    JSON.stringify({ confirmPassword, email, name, password })
  );

  if (isError(result)) {
    dispatch(displayNotification(result.error, "error"));
    dispatch(setIsLoading(false));
    return;
  }

  dispatch(setIsLoggedIn(true));
  dispatch(setEmail(result.email));
  dispatch(setName(result.name));
  dispatch(setPassword(""));
  dispatch(setConfirmPassword(""));
  dispatch(setSavedJobs(result.savedJobs));

  dispatch(setIsLoading(false));
};

export const initializeApplication = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));
  dispatch(setError(null, null));
  dispatch(setCurrentJobs([]));
  dispatch(setCurrentPage(1));
  dispatch(setFullTime(false));
  dispatch(setJobDetails(null));
  dispatch(setJobs([]));
  dispatch(setLocationSearch(""));
  dispatch(setSearchValue(""));
  dispatch(setTotalPages(1));

  // * Establish Job Data
  dispatch(getJobs());

  // * Establish User Authentication
  dispatch(checkAuthentication());
};

export const checkAuthentication = (): AppThunk => async (dispatch) => {
  try {
    const response = await fetch("/user/me");
    if (response.status === 200) {
      const user: ServerResponseUser = await response.json();
      dispatch(setName(user.name));
      dispatch(setEmail(user.email));
      dispatch(setSavedJobs(user.savedJobs));
      dispatch(setIsLoggedIn(true));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  dispatch(setIsLoading(false));
};

export const logOut = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  // TODO - Modify
  const response = await fetchServerData("/user/logout", "POST");

  if (response.error) {
    console.error(response.error);
    dispatch(
      displayNotification(
        "Error when attempting to log out. Please try again or contact the developer.",
        "error"
      )
    );
    return;
  }

  dispatch(setConfirmPassword(""));
  dispatch(setEmail(""));
  dispatch(displayNotification("", "default"));
  dispatch(setName(""));
  dispatch(setPassword(""));
  dispatch(setSavedJobs([]));
  dispatch(setIsLoggedIn(false));

  dispatch(setIsLoading(false));
};

export const logOutAll = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  // TODO - Modify
  const response = await fetchServerData("/user/logout/all", "POST");

  if (response.error) {
    console.error(response.error);
    dispatch(
      displayNotification(
        "Error when attempting to log out. Please try again or contact the developer.",
        "error"
      )
    );
    return;
  }

  dispatch(setConfirmPassword(""));
  dispatch(setEmail(""));
  dispatch(displayNotification("", "default"));
  dispatch(setName(""));
  dispatch(setPassword(""));
  dispatch(setSavedJobs([]));
  dispatch(setIsLoggedIn(false));

  dispatch(setIsLoading(false));
};

export const resetPassword = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));
  const state: RootState = getState();

  const {
    resetConfirmNewPassword,
    resetCurrentPassword,
    resetNewPassword,
  } = state.user;

  if (resetConfirmNewPassword !== resetNewPassword) {
    dispatch(displayNotification("Passwords do not match.", "error"));
    dispatch(setIsLoading(false));
    return;
  }

  try {
    // TODO - Modify
    const response: ResetPasswordResponse = await fetchServerData(
      "/user/me",
      "PATCH",
      JSON.stringify({
        currentPassword: resetCurrentPassword,
        newPassword: resetNewPassword,
      })
    );

    if (response.error) {
      dispatch(displayNotification(response.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(displayNotification("Password reset successfully.", "success"));
    dispatch(setResetConfirmNewPassword(""));
    dispatch(setResetCurrentPassword(""));
    dispatch(setResetNewPassword(""));
    dispatch(setIsResettingPassword(false));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const cancelResetPassword = (): AppThunk => (dispatch) => {
  dispatch(setResetConfirmNewPassword(""));
  dispatch(setResetCurrentPassword(""));
  dispatch(setResetNewPassword(""));
  dispatch(displayNotification("", "default"));
  dispatch(setIsResettingPassword(false));
};

export const clickEditProfile = (): AppThunk => (dispatch, getState) => {
  const state: RootState = getState();

  const { email, name } = state.user;

  dispatch(displayNotification("", "default"));
  dispatch(setEditEmail(email));
  dispatch(setEditName(name));
  dispatch(setIsEditingProfile(true));
};

export const cancelEditProfile = (): AppThunk => (dispatch) => {
  dispatch(setEditEmail(""));
  dispatch(setEditName(""));
  dispatch(displayNotification("", "default"));
  dispatch(setIsEditingProfile(false));
};

export const editProfile = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));
  const state: RootState = getState();

  const { editEmail, editName } = state.user;
  try {
    // TODO - Modify
    const response: EditProfileResponse = await fetchServerData(
      "/user/me",
      "PATCH",
      JSON.stringify({ email: editEmail, name: editName })
    );

    if (response.error) {
      dispatch(displayNotification(response.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(
      displayNotification(
        "Profile information updated successfully.",
        "success"
      )
    );
    dispatch(setEditEmail(""));
    dispatch(setEditName(""));
    dispatch(setEmail(response.email));
    dispatch(setName(response.name));
    dispatch(setIsEditingProfile(false));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const cancelDeleteProfile = (): AppThunk => (dispatch) => {
  dispatch(displayNotification("", "default"));
  dispatch(setIsDeletingProfile(false));
};

export const clickDeleteProfile = (): AppThunk => (dispatch) => {
  dispatch(
    displayNotification(
      "Are you sure you would like to delete your profile? This can not be reversed.",
      "warning"
    )
  );
  dispatch(setIsDeletingProfile(true));
};

export const deleteProfile = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    // TODO - Modify
    const response: DeleteProfileResponse = await fetchServerData(
      "/user/me",
      "DELETE"
    );

    if (response.error) {
      dispatch(displayNotification(response.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(displayNotification("Profile deleted successfully.", "success"));
    dispatch(setEmail(""));
    dispatch(setName(""));
    dispatch(setSavedJobs([]));
    dispatch(setIsDeletingProfile(false));
    dispatch(setIsLoggedIn(false));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const addSavedJob = (id: string): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    // TODO - Modify
    const result:
      | AddSavedJobErrorResponse
      | AddSavedJobSuccessResponse = await fetchServerData(
      "/user/savedJobs",
      "PATCH",
      JSON.stringify({ method: "ADD", id })
    );

    if (isError(result)) {
      dispatch(displayNotification(result.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    const { savedJobs } = result;

    dispatch(setSavedJobs(savedJobs));
    dispatch(setSavedJobsCurrentPage(1));
    dispatch(setSavedJobsTotalPages(Math.ceil(savedJobs.length / 5)));
    dispatch(displayNotification("Job saved successfully.", "success"));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const removeSavedJob = (id: string): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    // TODO - Modify
    const result:
      | RemoveSavedJobErrorResponse
      | RemoveSavedJobSuccessResponse = await fetchServerData(
      "/user/savedJobs",
      "PATCH",
      JSON.stringify({ method: "REMOVE", id })
    );

    if (isError(result)) {
      dispatch(displayNotification(result.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    const { savedJobs } = result;

    dispatch(setSavedJobs(savedJobs));
    dispatch(setSavedJobsCurrentPage(1));
    dispatch(setSavedJobsTotalPages(Math.ceil(savedJobs.length / 5)));
    dispatch(displayNotification("Job removed successfully.", "success"));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const clickViewSavedJobs = (): AppThunk => (dispatch) => {
  dispatch(setCurrentPage(1));
  dispatch(displayNotification("", "default"));
  dispatch(setIsViewingSavedJobs(true));
};

export const getJobDetails = (id: string): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    const result: Job = await fetchServerData(`/jobs/${id}`, "GET");

    if (isError(result)) {
      dispatch(displayNotification(result.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setJobDetails(result));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const getSavedJobsDetails = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    const result:
      | GetSavedJobsDetailsErrorResponse
      | GetSavedJobsDetailsSuccessResponse = await fetchServerData(
      `/user/savedJobsDetails`,
      "GET"
    );

    if (isError(result)) {
      dispatch(displayNotification(result.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setSavedJobsDetails(result));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};
