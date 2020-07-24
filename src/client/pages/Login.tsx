import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import Button from "../components/Button";
import Copyright from "../components/Copyright";
import Notification from "../components/Notification";
import Input from "../components/Input";

import { setEmail, setPassword } from "../redux/actions/user";
import { logIn } from "../redux/thunks";

import { RootState } from "../types";

export interface LoginProps {
  email: string;
  notificationMessage: string;
  handleEmailChange: (email: string) => void;
  handleLogIn: () => void;
  handlePasswordChange: (password: string) => void;
  isLoggedIn: boolean;
  password: string;
}

const Login: React.SFC<LoginProps> = (props: LoginProps) => {
  const {
    email,
    notificationMessage,
    handleEmailChange,
    handleLogIn,
    handlePasswordChange,
    isLoggedIn,
    password,
  } = props;

  if (isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <div id="login-page">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogIn();
          }}
        >
          <div className="login__container__title">
            <span className="avatar">
              <i className="material-icons">lock</i>
            </span>
            <h1>Login</h1>
          </div>

          {notificationMessage && (
            <Notification message={notificationMessage} type="info" />
          )}

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

          <div className="login__container__actions">
            <Link
              className="login__action__create"
              id="create-an-account"
              to="/signup"
            >
              <i className="material-icons">account_circle</i>
              <span>Create an account</span>
            </Link>
            <Button
              buttonStyle="primary"
              id="log-in"
              label="Log in"
              type="submit"
            />
          </div>
        </form>
        <Copyright />
      </div>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  notificationMessage: state.application.notificationMessage,
  isLoggedIn: state.user.isLoggedIn,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  handleEmailChange: (email: string) => dispatch(setEmail(email)),
  handleLogIn: () => dispatch(logIn()),
  handlePasswordChange: (password: string) => dispatch(setPassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
