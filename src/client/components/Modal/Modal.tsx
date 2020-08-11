import * as React from "react";
import { connect } from "react-redux";

import {
  ModalContainer,
  ModalInnerContainer,
  ModalTitle,
  Shade,
} from "./Modal-styled";

import { resetModal } from "../../redux/thunks";

import { RootState } from "../../types";

export interface ModalProps {
  handleCloseModal: () => void;
  isModalOpen: boolean;
  modalContent: any;
  modalTitle: string;
}

const Modal: React.SFC<ModalProps> = (props: ModalProps) => {
  const { handleCloseModal, isModalOpen, modalContent, modalTitle } = props;

  console.log(typeof modalContent);
  return (
    <>
      <Shade isModalOpen={isModalOpen} />
      <ModalContainer id="modal" isModalOpen={isModalOpen}>
        <ModalInnerContainer>
          <ModalTitle>
            <h2>{modalTitle}</h2>
            <button id="modal-close" onClick={() => handleCloseModal()}>
              x
            </button>
          </ModalTitle>
          {modalContent}
        </ModalInnerContainer>
      </ModalContainer>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isModalOpen: state.application.isModalOpen,
  modalContent: state.application.modalContent,
  modalTitle: state.application.modalTitle,
});

const mapDispatchToProps = (dispatch) => ({
  handleCloseModal: () => dispatch(resetModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
