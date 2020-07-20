import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export interface ApplicationAction {
  type: string;
  // eslint-disable-next-line
  payload: any;
}

export interface ApplicationState {
  currentJobs: Job[];
  currentPage: number;
  fullTime: boolean;
  isLoading: boolean;
  jobs: Job[];
  jobsFetchedAt: string;
  locationSearch: string;
  searchValue: string;
  totalPages: number;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

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

export interface LoginAction {
  type: string;
  // eslint-disable-next-line
  payload: any;
}

export type LoginResponse = LoginResponseError & LoginResponseSuccess;

export interface LoginResponseError {
  error: string;
}

export interface LoginResponseSuccess {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface LoginState {
  userType: LoginUserType;
}

export type LoginUserType = "current" | "new";

export type PaginationNavigationType = "left" | "right";

export type RootState = {
  application: ApplicationState;
  login: LoginState;
  user: UserState;
};

export type SearchType = "description" | "location";

export interface UserAction {
  type: string;
  // eslint-disable-next-line
  payload: any;
}

export interface UserState {
  confirmPassword: string;
  email: string;
  isLoggedIn: false;
  password: string;
}
