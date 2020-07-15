import { UIAction, UIState } from "../../types";

export const initialState: UIState = {};

const reducer = (state = initialState, action: UIAction): UIState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
