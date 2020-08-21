import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../../components/Button";
import Copyright from "../../components/Copyright";
import Input from "../../components/Input";

import {
  SignupContainer,
  SignupTitleContainer,
  SignupActionsContainer,
} from "./Signup-styled";

import { signup } from "../../redux/thunks";

import { RootState } from "../../types";

export interface SignupProps {
  handleSignup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  isLoggedIn: boolean;
}

const Signup: React.SFC<SignupProps> = (props: SignupProps) => {
  const { handleSignup, isLoggedIn } = props;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  if (isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <SignupContainer id="signup-page">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup(name, email, password, confirmPassword);
          }}
        >
          <SignupTitleContainer>
            <span>
              <i className="material-icons">lock</i>
            </span>
            <h1>Create Account</h1>
          </SignupTitleContainer>

          <Input
            autoComplete="name"
            full
            icon="account_circle"
            id="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            placeholder="John Smith"
            required
            type="text"
            value={name}
          />
          <Input
            autoComplete="email"
            full
            icon="email"
            id="email"
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            type="email"
            value={email}
          />
          <Input
            autoComplete="new-password"
            full
            icon="lock"
            id="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            value={password}
          />
          <Input
            autoComplete="new-password"
            full
            icon="lock"
            id="confirm-password"
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            type="password"
            value={confirmPassword}
          />

          <SignupActionsContainer>
            <Button
              buttonStyle="primary"
              id="signup"
              label="Create account"
              type="submit"
            />
          </SignupActionsContainer>
        </form>
        <Copyright />
      </SignupContainer>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  handleSignup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => dispatch(signup(name, email, password, confirmPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
