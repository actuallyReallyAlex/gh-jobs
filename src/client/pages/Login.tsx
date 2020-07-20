import * as React from "react";
import { connect } from "react-redux";

import Input from "../components/Input";

import { setEmail } from "../redux/actions/user";

import { RootState } from "../types";

export interface LoginProps {
  email: string;
  handleEmailChange: (email: string) => void;
}

const Login: React.SFC<LoginProps> = (props: LoginProps) => {
  const { email, handleEmailChange } = props;
  return (
    <div id="login-page">
      <form>
        <Input
          icon="email"
          id="email"
          label="Email"
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="example@email.com"
          value={email}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ email: state.user.email });

const mapDispatchToProps = (dispatch) => ({
  handleEmailChange: (email: string) => dispatch(setEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
