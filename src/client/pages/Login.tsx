import * as React from "react";
import { connect } from "react-redux";

import Copyright from "../components/Copyright";
import Input from "../components/Input";

import { setUserType } from "../redux/actions/login";
import {
  setConfirmPassword,
  setEmail,
  setPassword,
} from "../redux/actions/user";
import { logIn } from "../redux/thunks";

import { LoginUserType, RootState } from "../types";

export interface LoginProps {
  confirmPassword: string;
  email: string;
  handleClickCreateAccount: () => void;
  handleConfirmPasswordChange: (confirmPassword: string) => void;
  handleEmailChange: (email: string) => void;
  handleLogIn: () => void;
  handlePasswordChange: (password: string) => void;
  password: string;
  userType: LoginUserType;
}

const Login: React.SFC<LoginProps> = (props: LoginProps) => {
  const {
    confirmPassword,
    email,
    handleClickCreateAccount,
    handleConfirmPasswordChange,
    handleEmailChange,
    handleLogIn,
    handlePasswordChange,
    password,
    userType,
  } = props;
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
          <h1>{userType === "current" ? "Login" : "Create Account"}</h1>
        </div>

        <Input
          autoComplete="email"
          icon="email"
          id="email"
          label="Email Address"
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="example@email.com"
          type="email"
          value={email}
        />
        <Input
          autoComplete={
            userType === "current" ? "current-password" : "new-password"
          }
          icon="lock"
          id="password"
          label="Password"
          onChange={(e) => handlePasswordChange(e.target.value)}
          type="password"
          value={password}
        />
        {userType === "current" && (
          <Input
            icon="lock"
            id="confirm-password"
            label="Confirm Password"
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            type="password"
            value={confirmPassword}
          />
        )}
        <button onClick={() => handleClickCreateAccount()} type="button">
          Create an account
        </button>
        <button type="submit">Log in</button>
      </form>
      <Copyright />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  confirmPassword: state.user.confirmPassword,
  email: state.user.email,
  password: state.user.password,
  userType: state.login.userType,
});

const mapDispatchToProps = (dispatch) => ({
  handleClickCreateAccount: () => dispatch(setUserType("new")),
  handleConfirmPasswordChange: (confirmPassword: string) =>
    dispatch(setConfirmPassword(confirmPassword)),
  handleEmailChange: (email: string) => dispatch(setEmail(email)),
  handleLogIn: () => dispatch(logIn()),
  handlePasswordChange: (password: string) => dispatch(setPassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
