import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export interface AddHiddenJobSuccessResponse {
  createdAt: string;
  email: string;
  hiddenJobs: [];
  name: string;
  savedJobs: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface AddSavedJobSuccessResponse {
  createdAt: string;
  email: string;
  hiddenJobs: [];
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

export interface ApplicationError {
  error: Error;
  componentStack: string;
}

export interface ApplicationState {
  contract: boolean;
  currentJobs: Job[];
  currentPage: number;
  error: ApplicationError;
  fullTime: boolean;
  isLoading: boolean;
  jobDetails: Job;
  jobs: Job[];
  locationSearch: string;
  notificationMessage: string;
  notificationType: NotificationType;
  redirectPath: string;
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

export type DeleteProfileResponse = ErrorResponse & ServerResponseUser;

export type EditProfileResponse = ErrorResponse & ServerResponseUser;

export interface ErrorResponse {
  error: string;
}

export type GetJobDetailsSuccessResponse = Job;

export type GetJobsSuccessResponse = Job[];

export type GetHiddenJobsDetailsSuccessResponse = Job[];

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
  description: string;
  how_to_apply: string;
  id: string;
  listingDate: string;
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

export type LoginResponse = ErrorResponse & ServerResponseUser;

export interface ModalAction {
  type: string;
  // eslint-disable-next-line
  payload: any;
}

export interface ModalState {
  isModalOpen: boolean;
  modalContent: string;
  modalTitle: string;
}

export type NotificationType =
  | "error"
  | "dark"
  | "default"
  | "info"
  | "success"
  | "warning";

export type PaginationNavigationType = "left" | "right";

export interface ReduxAction {
  type: string;
  // eslint-disable-next-line
  payload: any;
}

export interface RemoveHiddenJobSuccessResponse {
  createdAt: string;
  email: string;
  hiddenJobs: string[];
  name: string;
  savedJobs: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface RemoveSavedJobSuccessResponse {
  createdAt: string;
  email: string;
  hiddenJobs: string[];
  name: string;
  savedJobs: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}

export type RequestMethod = "DELETE" | "GET" | "PATCH" | "POST";

export type ResetPasswordResponse = ErrorResponse & ServerResponseUser;

export type RootState = {
  application: ApplicationState;
  modal: ModalState;
  user: UserState;
};

export type SearchType = "description" | "location";

export interface ServerResponseUser {
  createdAt: string;
  email: string;
  hiddenJobs: string[];
  name: string;
  savedJobs: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface SignupSuccessResponse {
  createdAt: string;
  email: string;
  hiddenJobs: string[];
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
  email: string;
  hiddenJobs: string[];
  hiddenJobsDetails: Job[];
  id: string;
  isEditingProfile: boolean;
  isLoggedIn: false;
  name: string;
  savedJobs: string[];
  savedJobsCurrentPage: number;
  savedJobsDetails: Job[];
  savedJobsTotalPages: number;
}
