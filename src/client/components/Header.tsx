import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  color: #282538;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 200;
  line-height: 36px;
  margin-bottom: 25px;
  margin-top: 25px;

  span {
    font-weight: bold;
  }
`;

// eslint-disable-next-line
const Header: React.SFC<{}> = () => {
  return (
    <Link id="header-link" to="/">
      <StyledHeader>
        <span>GitHub</span> Jobs
      </StyledHeader>
    </Link>
  );
};

export default Header;
