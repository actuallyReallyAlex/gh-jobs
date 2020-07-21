import * as React from "react";
import { connect } from "react-redux";

import Input from "../components/Input";

import { RootState } from "../types";

export interface ProfileProps {
  email: string;
  name: string;
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const { email, name } = props;
  return (
    <div id="profile">
      <form>
        <div className="profile__container__title">
          <span className="avatar">
            <i className="material-icons">account_circle</i>
          </span>
          <h1>Profile</h1>
        </div>

        <Input
          disabled
          icon="account_circle"
          id="name"
          label="Name"
          onChange={() => {}}
          type="text"
          value={name}
        />

        <Input
          disabled
          icon="email"
          id="email"
          label="Email Address"
          onChange={() => {}}
          type="email"
          value={email}
        />

        <button id="edit" onClick={() => {}} type="button">
          Edit
        </button>

        <button id="reset-password" onClick={() => {}} type="button">
          Reset Password
        </button>

        <button id="log-out" onClick={() => {}} type="button">
          Log Out
        </button>
        <button id="log-out-all" onClick={() => {}} type="button">
          Log Out of All Devices
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(Profile);
