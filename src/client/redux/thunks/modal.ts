import {
  setIsModalOpen,
  setModalContent,
  setModalTitle,
} from "../actions/modal";
import { AppThunk } from "../../types";

export const resetModal = (): AppThunk => (dispatch) => {
  dispatch(setIsModalOpen(false));
  dispatch(setModalContent(""));
  dispatch(setModalTitle(""));
};
