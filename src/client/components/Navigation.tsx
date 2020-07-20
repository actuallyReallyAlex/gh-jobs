import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Header from "./Header";
import { RootState } from "../types";

export interface NavigationProps {
  isLoggedIn: boolean;
}

const Navigation: React.SFC<NavigationProps> = (props: NavigationProps) => {
  const { isLoggedIn } = props;
  return (
    <nav id="navigation">
      <Header />
      {!isLoggedIn && <Link to="/login">Login</Link>}
    </nav>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Navigation);
