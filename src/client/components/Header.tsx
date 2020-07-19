import * as React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line
const Header: React.SFC<{}> = () => {
  return (
    <Link id="header-link" to="/">
      <header>
        <span className="bold">GitHub</span> Jobs
      </header>
    </Link>
  );
};

export default Header;
