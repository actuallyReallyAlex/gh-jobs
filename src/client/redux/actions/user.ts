import { SET_IS_LOGGED_IN } from "../actionTypes";

import { UserAction } from "../../types";

export const setIsLoggedIn = (isLoggedIn: boolean): UserAction => ({
  type: SET_IS_LOGGED_IN,
  payload: { isLoggedIn },
});
