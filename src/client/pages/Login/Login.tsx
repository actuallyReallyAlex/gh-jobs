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
import { setIsLoggedIn } from "../../redux/actions/user";
import { logIn } from "../../redux/thunks/user";

import { RootState } from "../../types";

export interface LoginProps {
  handleClearRedirectPath: () => void;
  handleLogIn: (email: string, password: string) => void;
  isLoggedIn: boolean;
  redirectPath: string;
}

const Login: React.SFC<LoginProps> = (props: LoginProps) => {
  const {
    handleClearRedirectPath,
    handleLogIn,
    isLoggedIn,
    redirectPath,
  } = props;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect((): void => {
    if (redirectPath) {
      handleClearRedirectPath();
    }
  }, [redirectPath]);

  if (isLoggedIn && !redirectPath) {
    return <Redirect to="/" />;
  } else {
    return (
      <LoginContainer id="login-page">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogIn(email, password);
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
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
  isLoggedIn: state.user.isLoggedIn,
  redirectPath: state.application.redirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  handleClearRedirectPath: () => {
    dispatch(setRedirectPath(""));
    dispatch(setIsLoggedIn(false));
  },
  handleLogIn: (email: string, password: string) =>
    dispatch(logIn(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
