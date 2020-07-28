import {
  setCurrentJobs,
  setCurrentPage,
  setIsLoading,
  setJobs,
  setSearchValue,
  setTotalPages,
  setNotificationMessage,
  setNotificationType,
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
  setSavedJobsTotalPages,
} from "./actions/user";
import { fetchServerData, unique, isError } from "../util";

import {
  AddSavedJobResponse,
  AppThunk,
  DeleteProfileResponse,
  EditProfileResponse,
  GetJobsErrorResponse,
  GetJobsSuccessResponse,
  Job,
  LocationOption,
  LoginResponse,
  RemoveSavedJobResponse,
  ResetPasswordResponse,
  RootState,
  ServerResponseUser,
  SignupResponse,
} from "../types";

export const getJobs = (): AppThunk => async (dispatch) => {
  try {
    const result = (await fetchServerData("/jobs", "GET")) as
      | GetJobsErrorResponse
      | GetJobsSuccessResponse;

    if (isError(result)) {
      dispatch(setNotificationType("error"));
      dispatch(setNotificationMessage(result.error));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setJobs(result.entries));
    dispatch(setCurrentPage(1));
    dispatch(setTotalPages(Math.ceil(result.entries.length / 5)));
    dispatch(setCurrentJobs(result.entries));
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
  dispatch(setSearchValue(search));
  const state: RootState = getState();
  const { fullTime, locationSearch } = state.application;

  const jobs = [];

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

  // * Since location options have to be a thing for the challenge
  // * Make as many requests as locations (since you can only have 1 location per request)
  // * And push all the results into one array
  await Promise.all(
    locationsSearches.map(async (location: LocationOption) => {
      const url = `/jobs/search?full_time=${encodeURI(
        fullTime.toString()
      )}&description=${encodeURI(search)}&location=${encodeURI(
        location.value
      )}`;
      const data = await fetchServerData(url, "GET");
      jobs.push(...data);
    })
  );

  if (locationsSearches.length === 0) {
    const url = `/jobs/search?full_time=${encodeURI(
      fullTime.toString()
    )}&description=${encodeURI(search)}`;
    const data = await fetchServerData(url, "GET");
    jobs.push(...data);
  }

  const uniqueJobs = unique(jobs);

  const finalJobs = uniqueJobs.filter((job: Job) =>
    fullTime ? job.type === "Full Time" : job
  );

  dispatch(setCurrentJobs(finalJobs));
  dispatch(setCurrentPage(1));
  dispatch(setTotalPages(Math.ceil(finalJobs.length / 5)));
  dispatch(setIsLoading(false));
};

export const pagination = (pageNumber: number): AppThunk => (dispatch) => {
  dispatch(setCurrentPage(pageNumber));
};

export const logIn = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(setNotificationMessage(""));

  const { user } = getState();
  const { email, password } = user;

  const response: LoginResponse = await fetchServerData(
    "/user/login",
    "POST",
    JSON.stringify({ email, password })
  );

  if (response.error) {
    dispatch(setNotificationType("error"));
    dispatch(setNotificationMessage(response.error));
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
  dispatch(setNotificationMessage(""));

  const { user } = getState();
  const { confirmPassword, email, name, password } = user;

  if (confirmPassword !== password) {
    dispatch(setNotificationType("error"));
    dispatch(setNotificationMessage("Passwords do not match."));
    dispatch(setIsLoading(false));
    return;
  }

  const response: SignupResponse = await fetchServerData(
    "/user",
    "POST",
    JSON.stringify({ confirmPassword, email, name, password })
  );

  if (response.error) {
    dispatch(setNotificationType("error"));
    dispatch(setNotificationMessage(response.error));
    dispatch(setIsLoading(false));
    return;
  }

  dispatch(setIsLoggedIn(true));
  dispatch(setEmail(response.email));
  dispatch(setName(response.name));
  dispatch(setPassword(""));
  dispatch(setConfirmPassword(""));
  dispatch(setSavedJobs(response.savedJobs));

  dispatch(setIsLoading(false));
};

export const initializeApplication = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setNotificationType("info"));
  dispatch(setNotificationMessage(""));

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
  const response = await fetchServerData("/user/logout", "POST");

  if (response.error) {
    console.error(response.error);
    dispatch(setNotificationType("error"));
    dispatch(
      setNotificationMessage(
        "Error when attempting to log out. Please try again or contact the developer."
      )
    );
    return;
  }

  dispatch(setConfirmPassword(""));
  dispatch(setEmail(""));
  dispatch(setNotificationMessage(""));
  dispatch(setName(""));
  dispatch(setPassword(""));
  dispatch(setSavedJobs([]));
  dispatch(setIsLoggedIn(false));

  dispatch(setIsLoading(false));
};

export const logOutAll = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await fetchServerData("/user/logout/all", "POST");

  if (response.error) {
    console.error(response.error);
    dispatch(setNotificationType("error"));
    dispatch(
      setNotificationMessage(
        "Error when attempting to log out. Please try again or contact the developer."
      )
    );
    return;
  }

  dispatch(setConfirmPassword(""));
  dispatch(setEmail(""));
  dispatch(setNotificationMessage(""));
  dispatch(setName(""));
  dispatch(setPassword(""));
  dispatch(setSavedJobs([]));
  dispatch(setIsLoggedIn(false));

  dispatch(setIsLoading(false));
};

export const resetPassword = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const state: RootState = getState();

  const {
    resetConfirmNewPassword,
    resetCurrentPassword,
    resetNewPassword,
  } = state.user;

  if (resetConfirmNewPassword !== resetNewPassword) {
    dispatch(setNotificationType("error"));
    dispatch(setNotificationMessage("Passwords do not match."));
    dispatch(setIsLoading(false));
    return;
  }

  try {
    const response: ResetPasswordResponse = await fetchServerData(
      "/user/me",
      "PATCH",
      JSON.stringify({
        currentPassword: resetCurrentPassword,
        newPassword: resetNewPassword,
      })
    );

    if (response.error) {
      dispatch(setNotificationType("error"));
      dispatch(setNotificationMessage(response.error));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setNotificationType("info"));
    dispatch(setNotificationMessage("Password reset successfully."));
    dispatch(setResetConfirmNewPassword(""));
    dispatch(setResetCurrentPassword(""));
    dispatch(setResetNewPassword(""));
    dispatch(setIsResettingPassword(false));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setNotificationType("error"));
    dispatch(setNotificationMessage(error));
    dispatch(setIsLoading(false));
  }
};

export const cancelResetPassword = (): AppThunk => (dispatch) => {
  dispatch(setResetConfirmNewPassword(""));
  dispatch(setResetCurrentPassword(""));
  dispatch(setResetNewPassword(""));
  dispatch(setNotificationMessage(""));
  dispatch(setIsResettingPassword(false));
};

export const clickEditProfile = (): AppThunk => (dispatch, getState) => {
  const state: RootState = getState();

  const { email, name } = state.user;

  dispatch(setNotificationMessage(""));
  dispatch(setEditEmail(email));
  dispatch(setEditName(name));
  dispatch(setIsEditingProfile(true));
};

export const cancelEditProfile = (): AppThunk => (dispatch) => {
  dispatch(setEditEmail(""));
  dispatch(setEditName(""));
  dispatch(setNotificationMessage(""));
  dispatch(setIsEditingProfile(false));
};

export const editProfile = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const state: RootState = getState();

  const { editEmail, editName } = state.user;
  try {
    const response: EditProfileResponse = await fetchServerData(
      "/user/me",
      "PATCH",
      JSON.stringify({ email: editEmail, name: editName })
    );

    if (response.error) {
      dispatch(setNotificationType("error"));
      dispatch(setNotificationMessage(response.error));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setNotificationType("info"));
    dispatch(
      setNotificationMessage("Profile information updated successfully.")
    );
    dispatch(setEditEmail(""));
    dispatch(setEditName(""));
    dispatch(setEmail(response.email));
    dispatch(setName(response.name));
    dispatch(setIsEditingProfile(false));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setNotificationType("error"));
    dispatch(setNotificationMessage(error));
    dispatch(setIsLoading(false));
  }
};

export const cancelDeleteProfile = (): AppThunk => (dispatch) => {
  dispatch(setNotificationMessage(""));
  dispatch(setIsDeletingProfile(false));
};

export const clickDeleteProfile = (): AppThunk => (dispatch) => {
  dispatch(setNotificationType("warning"));
  dispatch(
    setNotificationMessage(
      "Are you sure you would like to delete your profile? This can not be reversed."
    )
  );
  dispatch(setIsDeletingProfile(true));
};

export const deleteProfile = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const response: DeleteProfileResponse = await fetchServerData(
      "/user/me",
      "DELETE"
    );

    if (response.error) {
      dispatch(setNotificationType("error"));
      dispatch(setNotificationMessage(response.error));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setNotificationType("info"));
    dispatch(setNotificationMessage("Profile deleted successfully."));
    dispatch(setEmail(""));
    dispatch(setName(""));
    dispatch(setSavedJobs([]));
    dispatch(setIsDeletingProfile(false));
    dispatch(setIsLoggedIn(false));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setNotificationType("error"));
    dispatch(setNotificationMessage(error));
    dispatch(setIsLoading(false));
  }
};

export const addSavedJob = (job: Job): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response: AddSavedJobResponse = await fetchServerData(
      "/user/savedJobs",
      "PATCH",
      JSON.stringify({ method: "ADD", job })
    );

    if (response.error) {
      dispatch(setNotificationType("error"));
      dispatch(setNotificationMessage(response.error));
      dispatch(setIsLoading(false));
      return;
    }

    const { savedJobs } = response;

    dispatch(setSavedJobs(savedJobs));
    dispatch(setSavedJobsCurrentPage(1));
    dispatch(setSavedJobsTotalPages(Math.ceil(savedJobs.length / 5)));
    dispatch(setNotificationType("info"));
    dispatch(setNotificationMessage("Job saved successfully."));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setNotificationType("error"));
    dispatch(setNotificationMessage(error));
    dispatch(setIsLoading(false));
  }
};

export const removeSavedJob = (job: Job): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response: RemoveSavedJobResponse = await fetchServerData(
      "/user/savedJobs",
      "PATCH",
      JSON.stringify({ method: "REMOVE", job })
    );

    if (response.error) {
      dispatch(setNotificationType("error"));
      dispatch(setNotificationMessage(response.error));
      dispatch(setIsLoading(false));
      return;
    }

    const { savedJobs } = response;

    dispatch(setSavedJobs(savedJobs));
    dispatch(setSavedJobsCurrentPage(1));
    dispatch(setSavedJobsTotalPages(Math.ceil(savedJobs.length / 5)));
    dispatch(setNotificationType("info"));
    dispatch(setNotificationMessage("Job removed successfully."));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setNotificationType("error"));
    dispatch(setNotificationMessage(error));
    dispatch(setIsLoading(false));
  }
};

export const clickViewSavedJobs = (): AppThunk => (dispatch) => {
  dispatch(setIsViewingSavedJobs(true));
};
