import endOfToday from "date-fns/endOfToday";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfToday from "date-fns/startOfToday";

import {
  setCurrentJobs,
  setCurrentPage,
  setIsLoading,
  setJobs,
  setJobsFetchedAt,
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
  setIsEditingProfile,
  setIsLoggedIn,
  setIsResettingPassword,
  setName,
  setPassword,
  setResetConfirmNewPassword,
  setResetCurrentPassword,
  setResetNewPassword,
  setIsDeletingProfile,
} from "./actions/user";
import { fetchServerData, unique } from "../util";

import {
  AppThunk,
  EditProfileResponse,
  Job,
  LocationOption,
  LoginResponse,
  ResetPasswordResponse,
  RootState,
  ServerResponseUser,
  SignupResponse,
} from "../types";

export const getJobs = (): AppThunk => async (dispatch) => {
  try {
    const jobs: Job[] = await fetchServerData("/jobs", "GET");

    dispatch(setJobs(jobs));
    dispatch(setJobsFetchedAt(new Date().toString()));
    dispatch(setCurrentPage(1));
    dispatch(setTotalPages(Math.ceil(jobs.length / 5)));
    dispatch(setCurrentJobs(jobs));
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
    dispatch(setNotificationMessage(response.error));
    dispatch(setNotificationType("error"));
    dispatch(setIsLoading(false));
    return;
  }

  dispatch(setIsLoggedIn(true));
  dispatch(setEmail(response.email));
  dispatch(setName(response.name));

  dispatch(setIsLoading(false));
};

export const signup = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(setNotificationMessage(""));

  const { user } = getState();
  const { confirmPassword, email, name, password } = user;

  if (confirmPassword !== password) {
    dispatch(setNotificationMessage("Passwords do not match."));
    dispatch(setNotificationType("error"));
    dispatch(setIsLoading(false));
    return;
  }

  const response: SignupResponse = await fetchServerData(
    "/user",
    "POST",
    JSON.stringify({ confirmPassword, email, name, password })
  );

  if (response.error) {
    dispatch(setNotificationMessage(response.error));
    dispatch(setNotificationType("error"));
    dispatch(setIsLoading(false));
    return;
  }

  dispatch(setIsLoggedIn(true));
  dispatch(setEmail(response.email));
  dispatch(setName(response.name));

  dispatch(setIsLoading(false));
};

export const initializeApplication = (): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(setIsLoading(true));
  dispatch(setNotificationMessage(""));
  dispatch(setNotificationType("info"));
  const state: RootState = getState();
  const { jobsFetchedAt } = state.application;
  // * Establish Job Data
  if (jobsFetchedAt) {
    const isWithinToday = isWithinInterval(new Date(jobsFetchedAt), {
      start: startOfToday(),
      end: endOfToday(),
    });

    if (!isWithinToday) {
      dispatch(getJobs());
    }
  } else {
    dispatch(getJobs());
  }

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
    dispatch(setNotificationMessage("Passwords do not match."));
    dispatch(setNotificationType("error"));
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
      dispatch(setNotificationMessage(response.error));
      dispatch(setNotificationType("error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setNotificationMessage("Password reset successfully."));
    dispatch(setNotificationType("info"));
    dispatch(setResetConfirmNewPassword(""));
    dispatch(setResetCurrentPassword(""));
    dispatch(setResetNewPassword(""));
    dispatch(setIsResettingPassword(false));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setNotificationMessage(error));
    dispatch(setNotificationType("error"));
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
      dispatch(setNotificationMessage(response.error));
      dispatch(setNotificationType("error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(
      setNotificationMessage("Profile information updated successfully.")
    );
    dispatch(setNotificationType("info"));
    dispatch(setEditEmail(""));
    dispatch(setEditName(""));
    dispatch(setEmail(response.email));
    dispatch(setName(response.name));
    dispatch(setIsEditingProfile(false));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setNotificationMessage(error));
    dispatch(setNotificationType("error"));
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

export const deleteProfile = (): AppThunk => () => {
  alert("DELETE PROFILE");
};
