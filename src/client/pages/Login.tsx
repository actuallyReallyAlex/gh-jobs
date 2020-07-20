import * as React from "react";
import { connect } from "react-redux";

import Input from "../components/Input";

import { setEmail, setPassword } from "../redux/actions/user";

import { RootState } from "../types";

export interface LoginProps {
  email: string;
  handleEmailChange: (email: string) => void;
  handlePasswordChange: (password: string) => void;
  password: string;
}

const Login: React.SFC<LoginProps> = (props: LoginProps) => {
  const { email, handleEmailChange, handlePasswordChange, password } = props;
  return (
    <div id="login-page">
      <form>
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
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  handleEmailChange: (email: string) => dispatch(setEmail(email)),
  handlePasswordChange: (password: string) => dispatch(setPassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
