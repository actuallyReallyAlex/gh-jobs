import { SET_JOBS } from "../actionTypes";
import { ApplicationAction, ApplicationState, Job } from "../../types";

export const initialState: ApplicationState = {
  jobs: [],
};

const reducer = (
  state = initialState,
  action: ApplicationAction
): ApplicationState => {
  switch (action.type) {
    case SET_JOBS: {
      return { ...state, jobs: action.payload.jobs };
    }
    default:
      return state;
  }
};

export default reducer;
