import * as React from "react";

export interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
  return (
    <header>
      <span className="bold">GitHub</span> Jobs
    </header>
  );
};

export default Header;
