import {
  SET_IS_MODAL_OPEN,
  SET_MODAL_CONTENT,
  SET_MODAL_TITLE,
} from "../actionTypes";

import { ModalAction, ModalState } from "../../types";

export const initialState: ModalState = {
  isModalOpen: false,
  modalContent: "",
  modalTitle: "",
};

const reducer = (state = initialState, action: ModalAction): ModalState => {
  let key: string;
  let value;

  if (action && action.payload) {
    key = Object.keys(action.payload)[0];
    value = action.payload[key];
  }

  switch (action.type) {
    case SET_IS_MODAL_OPEN:
    case SET_MODAL_CONTENT:
    case SET_MODAL_TITLE:
      return { ...state, [key]: value };
    default:
      return state;
  }
};

export default reducer;
