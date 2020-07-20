import { LoginAction, LoginState } from "../../types";

export const initialState: LoginState = {
  userType: "current",
};

const reducer = (state = initialState, action: LoginAction): LoginState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
