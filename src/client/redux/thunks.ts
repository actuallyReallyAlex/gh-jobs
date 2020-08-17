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
} from "./actions/application";
import {
  setIsModalOpen,
  setModalContent,
  setModalTitle,
} from "./actions/modal";
import {
  setConfirmPassword,
  setEmail,
  setIsEditingProfile,
  setIsLoggedIn,
  setName,
  setPassword,
  setResetConfirmNewPassword,
  setResetCurrentPassword,
  setResetNewPassword,
  setSavedJobs,
  setSavedJobsCurrentPage,
  setSavedJobsDetails,
  setSavedJobsTotalPages,
  setHiddenJobs,
  setHiddenJobsDetails,
  setId,
} from "./actions/user";
import { fetchServerData, isError } from "../util";

import {
  AddHiddenJobErrorResponse,
  AddHiddenJobSuccessResponse,
  AddSavedJobErrorResponse,
  AddSavedJobSuccessResponse,
  AppThunk,
  DeleteProfileResponse,
  EditProfileResponse,
  GetHiddenJobsDetailsErrorResponse,
  GetHiddenJobsDetailsSuccessResponse,
  GetJobsErrorResponse,
  GetJobsSuccessResponse,
  GetSavedJobsDetailsErrorResponse,
  GetSavedJobsDetailsSuccessResponse,
  Job,
  LocationOption,
  LoginResponse,
  RemoveHiddenJobErrorResponse,
  RemoveHiddenJobSuccessResponse,
  RemoveSavedJobErrorResponse,
  RemoveSavedJobSuccessResponse,
  ResetPasswordResponse,
  RootState,
  ServerResponseUser,
  SignupErrorResponse,
  SignupSuccessResponse,
} from "../types";

export const searchJobs = (
  search: string,
  locationOptions: LocationOption[]
): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));
  dispatch(setSearchValue(search));

  const state: RootState = getState();
  const { contract, fullTime, locationSearch } = state.application;

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
  )}&contract=${encodeURI(contract.toString())}&description=${encodeURI(
    search
  )}`;

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

  // TODO - Make call to get jobs (now they will be filtered)

  dispatch(setIsLoggedIn(true));
  dispatch(setEmail(response.email));
  dispatch(setName(response.name));
  dispatch(setId(response._id));
  dispatch(setSavedJobs(response.savedJobs));
  dispatch(setHiddenJobs(response.hiddenJobs));

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
  dispatch(setHiddenJobs(result.hiddenJobs));

  dispatch(setIsLoading(false));
};

export const initializeApplication = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    // * Reset State to Defaults
    dispatch(displayNotification("", "default"));
    dispatch(setError(null, null));
    dispatch(setCurrentJobs([]));
    dispatch(setCurrentPage(1));
    dispatch(setJobDetails(null));
    dispatch(setJobs([]));
    dispatch(setTotalPages(1));
    dispatch(setIsModalOpen(false));
    dispatch(setModalContent(""));
    dispatch(setModalTitle(""));

    // * Establish User Authentication
    const userResponse = await fetch("/user/me");
    let userId = "";

    if (userResponse.status === 200) {
      // * User is authenticated
      const user: ServerResponseUser = await userResponse.json();

      userId = user._id;

      dispatch(setName(user.name));
      dispatch(setEmail(user.email));
      dispatch(setId(userId));
      dispatch(setSavedJobs(user.savedJobs));
      dispatch(setHiddenJobs(user.hiddenJobs));
      dispatch(setIsLoggedIn(true));
    }

    // * Establish Job Data
    const jobsResult = (await fetchServerData(
      "/jobs",
      "POST",
      JSON.stringify({ userId })
    )) as GetJobsErrorResponse | GetJobsSuccessResponse;

    if (isError(jobsResult)) {
      dispatch(displayNotification(jobsResult.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    // ? Needed? Or on BE?
    // const nonHiddenJobs = jobsResult.filter(
    //   (job: Job) => user.hiddenJobs.indexOf(job.id) < 0
    // );

    // dispatch(setCurrentJobs(nonHiddenJobs));
    // dispatch(setTotalPages(Math.ceil(nonHiddenJobs.length / 5)));

    dispatch(setJobs(jobsResult));
    dispatch(setCurrentPage(1));
    dispatch(setTotalPages(Math.ceil(jobsResult.length / 5)));
    dispatch(setCurrentJobs(jobsResult));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
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

  dispatch(displayNotification("", "default"));
  dispatch(setConfirmPassword(""));
  dispatch(setEmail(""));
  dispatch(setName(""));
  dispatch(setId(""));
  dispatch(setPassword(""));
  dispatch(setSavedJobs([]));
  dispatch(setHiddenJobs([]));
  dispatch(setIsLoggedIn(false));
  dispatch(setIsModalOpen(false));
  dispatch(setModalContent(""));
  dispatch(setModalTitle(""));

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
  dispatch(displayNotification("", "default"));
  dispatch(setEmail(""));
  dispatch(setName(""));
  dispatch(setId(""));
  dispatch(setPassword(""));
  dispatch(setSavedJobs([]));
  dispatch(setHiddenJobs([]));
  dispatch(setIsLoggedIn(false));
  dispatch(setIsModalOpen(false));
  dispatch(setModalContent(""));
  dispatch(setModalTitle(""));

  dispatch(setIsLoading(false));
};

export const resetPassword = (
  currentPassword: string,
  newPassword: string
): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    // TODO - Modify
    const response: ResetPasswordResponse = await fetchServerData(
      "/user/me",
      "PATCH",
      JSON.stringify({
        currentPassword,
        newPassword,
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
    dispatch(setIsModalOpen(false));
    dispatch(setModalContent(""));
    dispatch(setModalTitle(""));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const editProfile = (email: string, name: string): AppThunk => async (
  dispatch
) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    // TODO - Modify
    const response: EditProfileResponse = await fetchServerData(
      "/user/me",
      "PATCH",
      JSON.stringify({ email, name })
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
    dispatch(setHiddenJobs([]));
    dispatch(setIsLoggedIn(false));
    dispatch(setIsLoading(false));
    dispatch(setIsModalOpen(false));
    dispatch(setModalContent(""));
    dispatch(setModalTitle(""));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const addHiddenJob = (id: string): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(setIsLoading(true));
  try {
    const state: RootState = getState();
    const { currentJobs } = state.application;
    // TODO - Modify
    const result:
      | AddHiddenJobErrorResponse
      | AddHiddenJobSuccessResponse = await fetchServerData(
      "/user/hiddenJobs",
      "PATCH",
      JSON.stringify({ method: "ADD", id })
    );

    if (isError(result)) {
      dispatch(displayNotification(result.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    const { hiddenJobs } = result;

    const newCurrentJobs = currentJobs.filter((job: Job) => job.id !== id);

    dispatch(setHiddenJobs(hiddenJobs));
    dispatch(setCurrentJobs(newCurrentJobs));
    dispatch(setTotalPages(Math.ceil(newCurrentJobs.length / 5)));
    dispatch(displayNotification("Job hidden successfully.", "success"));
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

export const removeHiddenJob = (id: string): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    // TODO - Modify
    const result:
      | RemoveHiddenJobErrorResponse
      | RemoveHiddenJobSuccessResponse = await fetchServerData(
      "/user/hiddenJobs",
      "PATCH",
      JSON.stringify({ method: "REMOVE", id })
    );

    if (isError(result)) {
      dispatch(displayNotification(result.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    const { hiddenJobs } = result;

    dispatch(setHiddenJobs(hiddenJobs));
    dispatch(displayNotification("Job shown successfully.", "success"));
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

export const clickViewHiddenJobs = (): AppThunk => (dispatch) => {
  dispatch(setCurrentPage(1));
  dispatch(displayNotification("", "default"));
  dispatch(setModalContent("hiddenJobs"));
  dispatch(setModalTitle("Hidden Jobs"));
  dispatch(setIsModalOpen(true));
};

export const clickViewSavedJobs = (): AppThunk => (dispatch) => {
  dispatch(setCurrentPage(1));
  dispatch(displayNotification("", "default"));
  dispatch(setModalContent("savedJobs"));
  dispatch(setModalTitle("Saved Jobs"));
  dispatch(setIsModalOpen(true));
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

export const getHiddenJobsDetails = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    const result:
      | GetHiddenJobsDetailsErrorResponse
      | GetHiddenJobsDetailsSuccessResponse = await fetchServerData(
      `/user/hiddenJobsDetails`,
      "GET"
    );

    if (isError(result)) {
      dispatch(displayNotification(result.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setHiddenJobsDetails(result));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const resetModal = (): AppThunk => (dispatch) => {
  dispatch(setIsModalOpen(false));
  dispatch(setModalContent(""));
  dispatch(setModalTitle(""));
};
