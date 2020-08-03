import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export interface AddSavedJobErrorResponse {
  error: string;
}

export interface AddSavedJobSuccessResponse {
  createdAt: string;
  email: string;
  name: string;
  savedJobs: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface ApplicationAction {
  type: string;
  // eslint-disable-next-line
  payload: any;
}

export interface ApplicationState {
  currentJobs: Job[];
  currentPage: number;
  error: Error;
  fullTime: boolean;
  isLoading: boolean;
  jobDetails: Job;
  jobs: Job[];
  locationSearch: string;
  notificationMessage: string;
  notificationType: NotificationType;
  searchValue: string;
  totalPages: number;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type ButtonStyle = "primary" | "secondary" | "danger";

export type ButtonType = "button" | "reset" | "submit";

export type DeleteProfileResponse = ServerResponseError & ServerResponseUser;

export type EditProfileResponse = ServerResponseError & ServerResponseUser;

export interface GetJobDetailsErrorResponse {
  error: string;
}

export type GetJobDetailsSuccessResponse = Job;

export interface GetJobsErrorResponse {
  error: string;
}

export type GetJobsSuccessResponse = Job[];

export interface GetSavedJobsDetailsErrorResponse {
  error: string;
}

export type GetSavedJobsDetailsSuccessResponse = Job[];

export type InputAutoComplete =
  | "off"
  | "on"
  | "name"
  | "email"
  | "username"
  | "new-password"
  | "current-password"
  | "one-time-code"
  | "organization-title"
  | "organization"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level4"
  | "address-level3"
  | "address-level2"
  | "address-level1"
  | "country"
  | "country-name"
  | "postal-code"
  | "cc-name"
  | "cc-given-name"
  | "cc-additional-name"
  | "cc-number"
  | "cc-exp"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-csc"
  | "cc-type"
  | "transaction-currency"
  | "transaction-amount"
  | "language"
  | "bday"
  | "bday-day"
  | "bday-month"
  | "bday-year"
  | "sex"
  | "tel"
  | "tel-extension"
  | "impp"
  | "url"
  | "photo";

export type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export interface Job {
  company: string;
  company_logo: string;
  company_url: string;
  created_at: string;
  description: string;
  how_to_apply: string;
  id: string;
  location: string;
  title: string;
  type: JobType;
  url: string;
}

export type JobType = "Contract" | "Full Time";

export interface LocationOption {
  name: string;
  setter: (param: string) => void;
  value: string;
}

export type LoginResponse = ServerResponseError & ServerResponseUser;

export type NotificationType =
  | "error"
  | "dark"
  | "default"
  | "info"
  | "success"
  | "warning";

export type PaginationNavigationType = "left" | "right";

export interface RemoveSavedJobErrorResponse {
  error: string;
}

export interface RemoveSavedJobSuccessResponse {
  createdAt: string;
  email: string;
  name: string;
  savedJobs: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}

export type RequestMethod = "DELETE" | "GET" | "PATCH" | "POST";

export type ResetPasswordResponse = ServerResponseError & ServerResponseUser;

export type RootState = {
  application: ApplicationState;
  user: UserState;
};

export type SearchType = "description" | "location";

export interface ServerResponseError {
  error: string;
}

export interface ServerResponseUser {
  createdAt: string;
  email: string;
  name: string;
  savedJobs: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface SignupErrorResponse {
  error: string;
}

export interface SignupSuccessResponse {
  createdAt: string;
  email: string;
  name: string;
  savedJobs: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface UserAction {
  type: string;
  // eslint-disable-next-line
  payload: any;
}

export interface UserState {
  confirmPassword: string;
  editEmail: string;
  editName: string;
  email: string;
  isDeletingProfile: boolean;
  isEditingProfile: boolean;
  isLoggedIn: false;
  isResettingPassword: boolean;
  isViewingSavedJobs: boolean;
  name: string;
  password: string;
  resetConfirmNewPassword: string;
  resetCurrentPassword: string;
  resetNewPassword: string;
  savedJobs: string[];
  savedJobsCurrentPage: number;
  savedJobsDetails: Job[];
  savedJobsTotalPages: number;
}
