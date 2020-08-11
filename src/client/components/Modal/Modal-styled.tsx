import styled from "styled-components";

interface ModalContainerProps {
  isModalOpen: boolean;
}

const ModalContainer = styled.div<ModalContainerProps>`
  align-items: center;
  background-color: transparent;
  bottom: 0;
  display: ${(props) => (props.isModalOpen ? "flex" : "none")};
  left: 0;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const ModalInnerContainer = styled.div`
  background-color: #ffffff;
  border-radius: 1.25rem;
  height: fit-content;
  padding: 25px;
  width: 50%;
`;

const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 25px;

  button {
    background: transparent;
    border: 0;
    font-size: 20px;

    &:hover {
      cursor: pointer;
    }
  }

  h2 {
    margin: 0;
  }
`;

interface ShadeProps {
  isModalOpen: boolean;
}

const Shade = styled.div<ShadeProps>`
  background-color: rgba(0, 0, 0, 0.75);
  bottom: 0;
  display: ${(props) => (props.isModalOpen ? "block" : "none")};
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;
`;

export { ModalContainer, ModalInnerContainer, ModalTitle, Shade };
