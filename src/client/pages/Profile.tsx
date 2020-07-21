import * as React from "react";
import { connect } from "react-redux";

import Input from "../components/Input";

import { RootState } from "../types";
import Button from "../components/Button";

export interface ProfileProps {
  email: string;
  name: string;
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const { email, name } = props;
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
            onClick={() => {}}
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
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(Profile);
