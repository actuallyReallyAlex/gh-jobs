import styled from "styled-components";

const OptionsPanelContainer = styled.div`
  padding: 16px;
  width: 25%;

  @media only screen and (max-width: 800px) {
    padding: 0;
    width: auto;
  }

  @media only screen and (max-width: 600px) {
    padding: 0;
    width: auto;
  }

  button {
    margin-top: 10px;
  }
`;

export { OptionsPanelContainer };
