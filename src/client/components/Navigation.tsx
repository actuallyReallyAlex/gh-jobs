import * as React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => {
  return (
    <nav id="navigation">
      <Header />
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navigation;
