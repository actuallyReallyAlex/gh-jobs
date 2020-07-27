import * as React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { NavigationContainer } from "./Navigation-styled";

import Header from "../Header";

import { RootState } from "../../types";

export interface NavigationProps {
  isLoggedIn: boolean;
}

const Navigation: React.SFC<NavigationProps> = (props: NavigationProps) => {
  const { isLoggedIn } = props;
  const { pathname } = useLocation();

  return (
    <NavigationContainer id="navigation">
      <Header />
      {!isLoggedIn && pathname !== "/login" && (
        <Link id="nav-login" to="/login">
          <span>Login</span>
        </Link>
      )}
      {isLoggedIn && pathname !== "/profile" && (
        <Link id="nav-profile" to="/profile">
          <span>Profile</span>
        </Link>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Navigation);
