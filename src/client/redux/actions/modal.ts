import {
  SET_IS_MODAL_OPEN,
  SET_MODAL_CONTENT,
  SET_MODAL_TITLE,
} from "../actionTypes";

import { ModalAction } from "../../types";

export const setIsModalOpen = (isModalOpen: boolean): ModalAction => ({
  type: SET_IS_MODAL_OPEN,
  payload: { isModalOpen },
});

export const setModalContent = (modalContent: string): ModalAction => ({
  type: SET_MODAL_CONTENT,
  payload: { modalContent },
});

export const setModalTitle = (modalTitle: string): ModalAction => ({
  type: SET_MODAL_TITLE,
  payload: { modalTitle },
});
