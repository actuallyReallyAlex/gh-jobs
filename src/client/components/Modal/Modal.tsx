import * as React from "react";
import { connect } from "react-redux";

import {
  ModalContainer,
  ModalInnerContainer,
  ModalTitle,
  Shade,
} from "./Modal-styled";

import contents from "./contents";

import { resetModal } from "../../redux/thunks/modal";

import { RootState } from "../../types";

export interface ModalProps {
  handleCloseModal: () => void;
  isModalOpen: boolean;
  modalContent: string;
  modalTitle: string;
}

const Modal: React.SFC<ModalProps> = (props: ModalProps) => {
  const { handleCloseModal, isModalOpen, modalContent, modalTitle } = props;

  const Content = contents[modalContent];

  return (
    <>
      <Shade isModalOpen={isModalOpen} />
      <ModalContainer id="modal" isModalOpen={isModalOpen}>
        <ModalInnerContainer>
          <ModalTitle>
            <h2 id="modal-title">{modalTitle}</h2>
            <button id="modal-close" onClick={() => handleCloseModal()}>
              x
            </button>
          </ModalTitle>
          {Content && <Content />}
        </ModalInnerContainer>
      </ModalContainer>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isModalOpen: state.modal.isModalOpen,
  modalContent: state.modal.modalContent,
  modalTitle: state.modal.modalTitle,
});

const mapDispatchToProps = (dispatch) => ({
  handleCloseModal: () => dispatch(resetModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
