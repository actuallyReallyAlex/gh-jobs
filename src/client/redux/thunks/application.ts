import { globalErrorHandler } from "./util";
import {
  displayNotification,
  setCurrentJobs,
  setCurrentPage,
  setError,
  setIsLoading,
  setJobDetails,
  setJobs,
  setLocationSearch,
  setSearchValue,
  setTotalPages,
} from "../actions/application";
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
import { fetchServerData, isError } from "../../util";

import {
  AppThunk,
  ErrorResponse,
  GetJobsSuccessResponse,
  Job,
  LocationOption,
  RootState,
  ServerResponseUser,
} from "../../types";

export const getJobDetails = (id: string): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    const result: Job = await fetchServerData(`/jobs/${id}`, "GET");

    if (isError(result)) {
      dispatch(globalErrorHandler(result, false));
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
    dispatch(setSearchValue(""));
    dispatch(setLocationSearch(""));

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
    )) as ErrorResponse | GetJobsSuccessResponse;

    if (isError(jobsResult)) {
      dispatch(displayNotification(jobsResult.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

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

export const searchJobs = (
  search: string,
  locationOptions: LocationOption[]
): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));
  dispatch(setSearchValue(search));

  const state: RootState = getState();
  const { contract, fullTime, locationSearch } = state.application;
  const { id } = state.user;

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

  let url = `/jobs/search?userId=${encodeURI(id)}&full_time=${encodeURI(
    fullTime.toString()
  )}&contract=${encodeURI(contract.toString())}&description=${encodeURI(
    search
  )}`;

  locationsSearches.forEach((locationSearch: LocationOption, i: number) => {
    url = url + `&location${i + 1}=${encodeURI(locationSearch.value)}`;
  });

  const data = (await fetchServerData(url, "GET")) as
    | ErrorResponse
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
