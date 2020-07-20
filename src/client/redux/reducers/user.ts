import { SET_EMAIL, SET_IS_LOGGED_IN } from "../actionTypes";

import { UserAction, UserState } from "../../types";

export const initialState: UserState = {
  email: "",
  isLoggedIn: false,
};

const reducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case SET_EMAIL: {
      return { ...state, email: action.payload.email };
    }
    case SET_IS_LOGGED_IN: {
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    }
    default:
      return state;
  }
};

export default reducer;
