import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import Button from "../../components/Button";
import Copyright from "../../components/Copyright";
import Input from "../../components/Input";

import {
  LoginContainer,
  LoginTitleContainer,
  LoginActionsContainer,
} from "./Login-styled";

import { setRedirectPath } from "../../redux/actions/application";
import { setEmail, setPassword, setIsLoggedIn } from "../../redux/actions/user";
import { logIn } from "../../redux/thunks";

import { RootState } from "../../types";

export interface LoginProps {
  email: string;
  handleClearRedirectPath: () => void;
  handleEmailChange: (email: string) => void;
  handleLogIn: () => void;
  handlePasswordChange: (password: string) => void;
  isLoggedIn: boolean;
  password: string;
  redirectPath: string;
}

const Login: React.SFC<LoginProps> = (props: LoginProps) => {
  const {
    email,
    handleClearRedirectPath,
    handleEmailChange,
    handleLogIn,
    handlePasswordChange,
    isLoggedIn,
    password,
    redirectPath,
  } = props;

  React.useEffect((): void => {
    if (redirectPath) {
      handleClearRedirectPath();
    }
  }, [redirectPath]);

  // debugger;

  console.log({ isLoggedIn, redirectPath });

  if (isLoggedIn && !redirectPath) {
    return <Redirect to="/" />;
  } else {
    return (
      <LoginContainer id="login-page">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogIn();
          }}
        >
          <LoginTitleContainer>
            <span>
              <i className="material-icons">lock</i>
            </span>
            <h1>Login</h1>
          </LoginTitleContainer>

          <Input
            autoComplete="email"
            full
            icon="email"
            id="email"
            label="Email Address"
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="example@email.com"
            required
            type="email"
            value={email}
          />
          <Input
            autoComplete="current-password"
            full
            icon="lock"
            id="password"
            label="Password"
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
            type="password"
            value={password}
          />

          <LoginActionsContainer>
            <Link id="create-an-account" to="/signup">
              <i className="material-icons">account_circle</i>
              <span>Create an account</span>
            </Link>
            <Button
              buttonStyle="primary"
              id="log-in"
              label="Log in"
              type="submit"
            />
          </LoginActionsContainer>
        </form>
        <Copyright />
      </LoginContainer>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  isLoggedIn: state.user.isLoggedIn,
  password: state.user.password,
  redirectPath: state.application.redirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  handleClearRedirectPath: () => {
    dispatch(setRedirectPath(""));
    dispatch(setIsLoggedIn(false));
  },
  handleEmailChange: (email: string) => dispatch(setEmail(email)),
  handleLogIn: () => dispatch(logIn()),
  handlePasswordChange: (password: string) => dispatch(setPassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
