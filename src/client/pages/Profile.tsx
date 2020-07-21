import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";

import { logOut } from "../redux/thunks";

import { RootState } from "../types";

export interface ProfileProps {
  email: string;
  handleLogOut: () => void;
  isLoggedIn: boolean;
  name: string;
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const { email, handleLogOut, isLoggedIn, name } = props;

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <div id="profile-page">
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

          <div className="profile__container__actions">
            <Button
              id="edit"
              label="Edit profile"
              onClick={() => {}}
              style="primary"
              type="button"
            />
            <Button
              id="reset-password"
              label="Reset password"
              onClick={() => {}}
              style="danger"
              type="button"
            />
          </div>

          <div className="profile__container__actions">
            <Button
              id="log-out"
              label="Log out"
              onClick={() => handleLogOut()}
              style="danger"
              type="button"
            />
            <Button
              id="log-out-all"
              label="Log out of all devices"
              onClick={() => {}}
              style="danger"
              type="button"
            />
          </div>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  isLoggedIn: state.user.isLoggedIn,
  name: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
