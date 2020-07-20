import { LoginAction, LoginState } from "../../types";
import { SET_USER_TYPE } from "../actionTypes";

export const initialState: LoginState = {
  userType: "current",
};

const reducer = (state = initialState, action: LoginAction): LoginState => {
  switch (action.type) {
    case SET_USER_TYPE: {
      return { ...state, userType: action.payload.userType };
    }
    default:
      return state;
  }
};

export default reducer;
