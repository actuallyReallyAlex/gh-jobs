import * as React from "react";
import { Link } from "react-router-dom";

import { StyledHeader } from "./Header-styled";

// eslint-disable-next-line
const Header: React.SFC<{}> = () => {
  return (
    <Link
      id="header-link"
      onClick={() => {
        throw new Error("FAKE ERROR");
      }}
      to="/"
    >
      <StyledHeader>
        <span>GitHub</span> Jobs
      </StyledHeader>
    </Link>
  );
};

export default Header;
