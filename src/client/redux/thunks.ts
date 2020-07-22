import endOfToday from "date-fns/endOfToday";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfToday from "date-fns/startOfToday";

import {
  setJobs,
  setJobsFetchedAt,
  setCurrentJobs,
  setIsLoading,
  setCurrentPage,
  setTotalPages,
  setSearchValue,
} from "./actions/application";
import {
  setIsLoggedIn,
  setFormError,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setResetConfirmNewPassword,
  setResetCurrentPassword,
  setResetNewPassword,
  setIsResettingPassword,
  setIsEditingProfile,
  setEditEmail,
  setEditName,
} from "./actions/user";
import { getData, unique, patchData, postData } from "../util";

import {
  AppThunk,
  Job,
  LocationOption,
  LoginResponse,
  RootState,
  SignupResponse,
} from "../types";

export const getJobs = (): AppThunk => async (dispatch) => {
  try {
    const jobs: Job[] = await getData("/jobs");

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
      const data = await getData(url);
      jobs.push(...data);
    })
  );

  if (locationsSearches.length === 0) {
    const url = `/jobs/search?full_time=${encodeURI(
      fullTime.toString()
    )}&description=${encodeURI(search)}`;
    const data = await getData(url);
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

export const pagination = (pageNumber: number): AppThunk => (dispach) => {
  dispach(setCurrentPage(pageNumber));
};

export const logIn = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(setFormError(""));

  const { user } = getState();
  const { email, password } = user;

  const response: LoginResponse = await postData(
    "/user/login",
    JSON.stringify({ email, password })
  );

  if (response.error) {
    dispatch(setFormError(response.error));
    dispatch(setIsLoading(false));
    return;
  }

  // TODO - Set user info
  dispatch(setIsLoggedIn(true));
  dispatch(setEmail(response.email));
  dispatch(setName(response.name));

  dispatch(setIsLoading(false));
};

export const signup = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(setFormError(""));

  const { user } = getState();
  const { confirmPassword, email, name, password } = user;

  if (confirmPassword !== password) {
    dispatch(setFormError("Passwords do not match."));
    dispatch(setIsLoading(false));
    return;
  }

  const response: SignupResponse = await postData(
    "/user",
    JSON.stringify({ confirmPassword, email, name, password })
  );

  if (response.error) {
    dispatch(setFormError(response.error));
    dispatch(setIsLoading(false));
    return;
  }

  // TODO - Set user info
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
      const user: LoginResponse = await response.json();
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
  const response = await postData("/user/logout", undefined);

  if (response.error) {
    // TODO - What to do if this errors
    console.log(response);
    return;
  }

  dispatch(setConfirmPassword(""));
  dispatch(setEmail(""));
  dispatch(setFormError(""));
  dispatch(setName(""));
  dispatch(setPassword(""));
  dispatch(setIsLoggedIn(false));

  dispatch(setIsLoading(false));
};

export const logOutAll = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await postData("/user/logout/all", undefined);

  if (response.error) {
    // TODO - What to do if this errors
    console.log(response);
    return;
  }

  dispatch(setConfirmPassword(""));
  dispatch(setEmail(""));
  dispatch(setFormError(""));
  dispatch(setName(""));
  dispatch(setPassword(""));
  dispatch(setIsLoggedIn(false));

  dispatch(setIsLoading(false));
};

export const resetPassword = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const state: RootState = getState();

  const {
    isResettingPassword,
    resetConfirmNewPassword,
    resetCurrentPassword,
    resetNewPassword,
  } = state.user;

  // TODO - Validation
  // TODO - Make sure `resetConfirmNewPassword` matches `resetNewPassword`

  try {
    const response: LoginResponse = await patchData(
      "/user/me",
      JSON.stringify({
        currentPassword: resetCurrentPassword,
        newPassword: resetNewPassword,
      })
    );

    if (response.error) {
      dispatch(setFormError(response.error));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setFormError("Password reset successfully."));
    dispatch(setResetConfirmNewPassword(""));
    dispatch(setResetCurrentPassword(""));
    dispatch(setResetNewPassword(""));
    dispatch(setIsResettingPassword(false));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setFormError(error));
    dispatch(setIsLoading(false));
  }
};

export const cancelResetPassword = (): AppThunk => (dispatch) => {
  dispatch(setResetConfirmNewPassword(""));
  dispatch(setResetCurrentPassword(""));
  dispatch(setResetNewPassword(""));
  dispatch(setFormError(""));
  dispatch(setIsResettingPassword(false));
};

export const clickEditProfile = (): AppThunk => (dispatch, getState) => {
  const state: RootState = getState();

  const { email, name } = state.user;

  dispatch(setFormError(""));
  dispatch(setEditEmail(email));
  dispatch(setEditName(name));
  dispatch(setIsEditingProfile(true));
};

export const cancelEditProfile = (): AppThunk => (dispatch) => {
  dispatch(setEditEmail(""));
  dispatch(setEditName(""));
  dispatch(setFormError(""));
  dispatch(setIsEditingProfile(false));
};

export const editProfile = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const state: RootState = getState();

  const { editEmail, editName } = state.user;
  try {
    const response: LoginResponse = await patchData(
      "/user/me",
      JSON.stringify({ email: editEmail, name: editName })
    );

    if (response.error) {
      dispatch(setFormError(response.error));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setFormError("Profile information updated successfully."));
    dispatch(setEditEmail(""));
    dispatch(setEditName(""));
    dispatch(setEmail(response.email));
    dispatch(setName(response.name));
    dispatch(setIsEditingProfile(false));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setFormError(error));
    dispatch(setIsLoading(false));
  }
};
