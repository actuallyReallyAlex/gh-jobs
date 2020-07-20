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

export type PaginationNavigationType = "left" | "right";

export type RootState = {
  application: ApplicationState;
};

export type SearchType = "description" | "location";

export interface UserAction {
  type: string;
  // eslint-disable-next-line
  payload: any;
}

export interface UserState {
  isLoggedIn: false;
}
