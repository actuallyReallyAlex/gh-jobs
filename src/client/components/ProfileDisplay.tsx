import * as React from "react";
import { connect } from "react-redux";

import Button from "./Button";
import Input from "./Input";

import { setNotificationMessage } from "../redux/actions/application";
import { setIsResettingPassword } from "../redux/actions/user";
import {
  clickEditProfile,
  clickDeleteProfile,
  clickViewSavedJobs,
  logOut,
  logOutAll,
} from "../redux/thunks";

import { RootState } from "../types";

export interface ProfileDisplayProps {
  email: string;
  handleClearFormError: () => void;
  handleClickDeleteProfile: () => void;
  handleClickEditProfile: () => void;
  handleClickViewSavedJobs: () => void;
  handleLogOut: () => void;
  handleLogOutAll: () => void;
  handleSetIsResettingPassword: (isResettingPassword: boolean) => void;
  name: string;
}

const ProfileDisplay: React.SFC<ProfileDisplayProps> = (
  props: ProfileDisplayProps
) => {
  const {
    email,
    handleClearFormError,
    handleClickDeleteProfile,
    handleClickEditProfile,
    handleClickViewSavedJobs,
    handleLogOut,
    handleLogOutAll,
    handleSetIsResettingPassword,
    name,
  } = props;
  return (
    <>
      <Input
        disabled
        icon="account_circle"
        id="name"
        label="Name"
        type="text"
        value={name}
      />

      <Input
        disabled
        icon="email"
        id="email"
        label="Email Address"
        type="email"
        value={email}
      />

      <div className="profile__container__actions">
        <Button
          id="edit"
          label="Edit profile"
          onClick={() => handleClickEditProfile()}
          style="primary"
          type="button"
        />
        <Button
          id="view-saved-jobs"
          label="View saved jobs"
          onClick={() => handleClickViewSavedJobs()}
          style="secondary"
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
          onClick={() => handleLogOutAll()}
          style="danger"
          type="button"
        />
      </div>

      <div className="profile__container__actions">
        <Button
          id="delete-profile"
          label="Delete profile"
          onClick={() => handleClickDeleteProfile()}
          style="danger"
          type="button"
        />
        <Button
          id="reset-password"
          label="Reset password"
          onClick={() => {
            handleClearFormError();
            handleSetIsResettingPassword(true);
          }}
          style="danger"
          type="button"
        />
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  name: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  handleClearFormError: () => dispatch(setNotificationMessage("")),
  handleClickDeleteProfile: () => dispatch(clickDeleteProfile()),
  handleClickEditProfile: () => dispatch(clickEditProfile()),
  handleClickViewSavedJobs: () => dispatch(clickViewSavedJobs()),
  handleLogOut: () => dispatch(logOut()),
  handleLogOutAll: () => dispatch(logOutAll()),
  handleSetIsResettingPassword: (isResettingPassword: boolean) =>
    dispatch(setIsResettingPassword(isResettingPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDisplay);
