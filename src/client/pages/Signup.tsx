import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../components/Button";
import Copyright from "../components/Copyright";
import Notification from "../components/Notification";
import Input from "../components/Input";

import {
  setConfirmPassword,
  setEmail,
  setName,
  setPassword,
} from "../redux/actions/user";
import { signup } from "../redux/thunks";

import { RootState } from "../types";

export interface SignupProps {
  confirmPassword: string;
  email: string;
  notificationMessage: string;
  handleConfirmPasswordChange: (confirmPassword: string) => void;
  handleEmailChange: (email: string) => void;
  handleNameChange: (name: string) => void;
  handlePasswordChange: (password: string) => void;
  handleSignup: () => void;
  isLoggedIn: boolean;
  name: string;
  password: string;
}

const Signup: React.SFC<SignupProps> = (props: SignupProps) => {
  const {
    confirmPassword,
    email,
    notificationMessage,
    handleConfirmPasswordChange,
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handleSignup,
    isLoggedIn,
    name,
    password,
  } = props;

  if (isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <div id="signup-page">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <div className="signup__container__title">
            <span className="avatar">
              <i className="material-icons">lock</i>
            </span>
            <h1>Create Account</h1>
          </div>

          {notificationMessage && (
            <Notification message={notificationMessage} type="info" />
          )}

          <Input
            autoComplete="name"
            icon="account_circle"
            id="name"
            label="Name"
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="John Smith"
            required
            type="text"
            value={name}
          />
          <Input
            autoComplete="email"
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
            autoComplete="new-password"
            icon="lock"
            id="password"
            label="Password"
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
            type="password"
            value={password}
          />
          <Input
            autoComplete="new-password"
            icon="lock"
            id="confirm-password"
            label="Confirm Password"
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            required
            type="password"
            value={confirmPassword}
          />

          <div className="signup__container__actions">
            <Button
              buttonStyle="primary"
              id="signup"
              label="Create account"
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
  confirmPassword: state.user.confirmPassword,
  email: state.user.email,
  notificationMessage: state.application.notificationMessage,
  isLoggedIn: state.user.isLoggedIn,
  name: state.user.name,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  handleConfirmPasswordChange: (confirmPassword: string) =>
    dispatch(setConfirmPassword(confirmPassword)),
  handleEmailChange: (email: string) => dispatch(setEmail(email)),
  handleNameChange: (name: string) => dispatch(setName(name)),
  handlePasswordChange: (password: string) => dispatch(setPassword(password)),
  handleSignup: () => dispatch(signup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
