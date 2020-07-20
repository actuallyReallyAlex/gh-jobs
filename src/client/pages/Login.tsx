import * as React from "react";
import { connect } from "react-redux";

import Copyright from "../components/Copyright";
import Input from "../components/Input";

import { setEmail, setPassword } from "../redux/actions/user";
import { logIn } from "../redux/thunks";

import { RootState } from "../types";
import { Link } from "react-router-dom";

export interface LoginProps {
  email: string;
  handleEmailChange: (email: string) => void;
  handleLogIn: () => void;
  handlePasswordChange: (password: string) => void;
  password: string;
}

const Login: React.SFC<LoginProps> = (props: LoginProps) => {
  const {
    email,
    handleEmailChange,
    handleLogIn,
    handlePasswordChange,
    password,
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
          <h1>Login</h1>
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
          autoComplete="current-password"
          icon="lock"
          id="password"
          label="Password"
          onChange={(e) => handlePasswordChange(e.target.value)}
          type="password"
          value={password}
        />

        <div className="login__container__actions">
          <Link className="login__action__create" to="/signup">
            <i className="material-icons">account_circle</i>
            <span>Create an account</span>
          </Link>
          <button id="log-in" type="submit">
            Log in
          </button>
        </div>
      </form>
      <Copyright />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  handleEmailChange: (email: string) => dispatch(setEmail(email)),
  handleLogIn: () => dispatch(logIn()),
  handlePasswordChange: (password: string) => dispatch(setPassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
