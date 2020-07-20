import { SET_USER_TYPE } from "../actionTypes";

import { LoginAction, LoginUserType } from "../../types";

export const setUserType = (userType: LoginUserType): LoginAction => ({
  type: SET_USER_TYPE,
  payload: { userType },
});
