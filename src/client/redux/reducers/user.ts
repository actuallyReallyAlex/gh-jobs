import { UserAction, UserState } from "../../types";

export const initialState: UserState = {
  isLoggedIn: false,
};

const reducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
