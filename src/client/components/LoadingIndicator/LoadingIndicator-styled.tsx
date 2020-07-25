import styled from "styled-components";

interface StyledLoadingIndicatorProps {
  isLoading: boolean;
}

const LoadingIndicatorContainer = styled.div<StyledLoadingIndicatorProps>`
  display: ${(props) => (props.isLoading ? "block" : "none")};
`;

const Orbit = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const OrbitContainer = styled.div`
  border-radius: 50%;
  box-sizing: border-box;
  height: 100px;
  left: calc(50% - 50px);
  perspective: 800px;
  position: absolute;
  top: calc(50% - 50px);
  width: 100px;
  z-index: 10;

  * {
    box-sizing: border-box;
  }

  div:nth-child(1) {
    left: 0%;
    top: 0%;
    animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
    border-bottom: 3px solid #b9bdcf;
  }

  div:nth-child(2) {
    right: 0%;
    top: 0%;
    animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
    border-right: 3px solid #b9bdcf;
  }

  div:nth-child(3) {
    right: 0%;
    bottom: 0%;
    animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
    border-top: 3px solid #b9bdcf;
  }
`;

const Shade = styled.div<StyledLoadingIndicatorProps>`
  background-color: rgba(0, 0, 0, 0.75);
  bottom: 0;
  display: ${(props) => (props.isLoading ? "block" : "none")};
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;
`;

export { LoadingIndicatorContainer, Orbit, OrbitContainer, Shade };
