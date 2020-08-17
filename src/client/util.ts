import { createBrowserHistory } from "history";

import {
  ErrorResponse,
  RequestMethod,
  GetJobDetailsSuccessResponse,
  GetJobsSuccessResponse,
  AddSavedJobSuccessResponse,
  SignupSuccessResponse,
} from "./types";

export const fetchServerData = async (
  url: string,
  method: RequestMethod,
  body?: string
  // eslint-disable-next-line
): Promise<any> => {
  const response = await fetch(url, {
    body: body ? body : undefined,
    headers: { "Content-Type": "application/json" },
    method,
  });
  if (response.status === 500 || response.status === 404) {
    return { error: `An error occured. Response Status = ${response.status}` };
  }
  const data = await response.json();
  return data;
};

/**
 * Loads the state of the application from localStorage if present.
 * @returns {object}
 */
// eslint-disable-next-line
export const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Saves the application state in localStorage.
 * @param {object} state State of the application.
 */
// eslint-disable-next-line
export const saveState = (state: any): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error(error);
  }
};

export const isError = (
  result:
    | AddSavedJobSuccessResponse
    | ErrorResponse
    | GetJobDetailsSuccessResponse
    | GetJobsSuccessResponse
    | SignupSuccessResponse
): result is ErrorResponse => {
  return (result as ErrorResponse).error !== undefined;
};

export const history = createBrowserHistory();
