import * as React from "react";
import styled from "styled-components";

const StyledP = styled.p`
  align-items: center;
  color: #b9bdcf;
  display: flex;
  font-size: 14px;
  font-weight: lighter;
  justify-content: center;
  line-height: 17px;
  margin-top: 50px;
  width: 100%;

  a {
    color: #b9bdcf;
    text-decoration: none;

    :hover {
      color: #8f929b;
      text-decoration: underline;
    }
  }
`;

// eslint-disable-next-line
const Copyright: React.SFC<{}> = () => {
  return (
    <StyledP>
      Copyright ©&nbsp;
      <a href="https://alexlee.dev/" rel="noopener noreferrer" target="_blank">
        Alex Lee&nbsp;
      </a>
      {new Date().getFullYear()}
    </StyledP>
  );
};

export default Copyright;
