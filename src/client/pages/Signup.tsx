import * as React from "react";
import { connect } from "react-redux";

import Copyright from "../components/Copyright";
import Input from "../components/Input";

import {
  setConfirmPassword,
  setEmail,
  setPassword,
} from "../redux/actions/user";
import { signup } from "../redux/thunks";

import { RootState } from "../types";

export interface SignupProps {
  confirmPassword: string;
  email: string;
  handleConfirmPasswordChange: (confirmPassword: string) => void;
  handleEmailChange: (email: string) => void;
  handlePasswordChange: (password: string) => void;
  handleSignup: () => void;
  password: string;
}

const Signup: React.SFC<SignupProps> = (props: SignupProps) => {
  const {
    confirmPassword,
    email,
    handleConfirmPasswordChange,
    handleEmailChange,
    handlePasswordChange,
    handleSignup,
    password,
  } = props;
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
          autoComplete="new-password"
          icon="lock"
          id="password"
          label="Password"
          onChange={(e) => handlePasswordChange(e.target.value)}
          type="password"
          value={password}
        />
        <Input
          icon="lock"
          id="confirm-password"
          label="Confirm Password"
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          type="password"
          value={confirmPassword}
        />
        <button type="submit">Create account</button>
      </form>
      <Copyright />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  confirmPassword: state.user.confirmPassword,
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  handleConfirmPasswordChange: (confirmPassword: string) =>
    dispatch(setConfirmPassword(confirmPassword)),
  handleEmailChange: (email: string) => dispatch(setEmail(email)),
  handlePasswordChange: (password: string) => dispatch(setPassword(password)),
  handleSignup: () => dispatch(signup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
