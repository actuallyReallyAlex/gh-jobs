import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../components/Button";
import Notification from "../components/Notification";
import Input from "../components/Input";

import { setNotificationMessage } from "../redux/actions/application";
import {
  setEditEmail,
  setEditName,
  setIsResettingPassword,
} from "../redux/actions/user";
import {
  cancelEditProfile,
  clickEditProfile,
  editProfile,
  logOut,
  logOutAll,
} from "../redux/thunks";

import { RootState } from "../types";
import ProfileReset from "../components/ProfileReset";

export interface ProfileProps {
  editEmail: string;
  editName: string;
  email: string;
  handleCancelEditProfile: () => void;
  handleClearFormError: () => void;
  handleClickEditProfile: () => void;
  handleEditProfile: () => void;
  handleLogOut: () => void;
  handleLogOutAll: () => void;
  handleSetEditEmail: (editEmail: string) => void;
  handleSetEditName: (editName: string) => void;
  handleSetIsResettingPassword: (isResettingPassword: boolean) => void;
  isEditingProfile: boolean;
  isLoggedIn: boolean;
  isResettingPassword: boolean;
  name: string;
  notificationMessage: string;
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const {
    editEmail,
    editName,
    email,
    handleCancelEditProfile,
    handleClearFormError,
    handleClickEditProfile,
    handleEditProfile,
    handleLogOut,
    handleLogOutAll,
    handleSetEditEmail,
    handleSetEditName,
    handleSetIsResettingPassword,
    isEditingProfile,
    isLoggedIn,
    isResettingPassword,
    name,
    notificationMessage,
  } = props;

  let heading = "Profile";

  if (isResettingPassword) {
    heading = "Reset Password";
  } else if (isEditingProfile) {
    heading = "Edit Profile";
  }

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
            <h1>{heading}</h1>
          </div>

          {notificationMessage && (
            <Notification message={notificationMessage} type="info" />
          )}

          {isResettingPassword && <ProfileReset />}

          {!isResettingPassword && isEditingProfile && (
            <>
              <Input
                icon="account_circle"
                id="edit-name"
                label="Name"
                onChange={(e) => handleSetEditName(e.target.value)}
                type="text"
                value={editName}
              />

              <Input
                icon="email"
                id="edit-email"
                label="Email Address"
                onChange={(e) => handleSetEditEmail(e.target.value)}
                type="email"
                value={editEmail}
              />

              <div className="profile__container__actions">
                <Button
                  id="cancel"
                  label="Cancel"
                  onClick={() => handleCancelEditProfile()}
                  style="secondary"
                  type="button"
                />
                <Button
                  disabled={
                    editName === "" ||
                    (editName === name && editEmail === email) ||
                    editEmail === ""
                  }
                  id="edit-confirm"
                  label="Confirm edit"
                  onClick={() => handleEditProfile()}
                  style="danger"
                  type="button"
                />
              </div>
            </>
          )}

          {!isResettingPassword && !isEditingProfile && (
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
            </>
          )}
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  editEmail: state.user.editEmail,
  editName: state.user.editName,
  email: state.user.email,
  isEditingProfile: state.user.isEditingProfile,
  isLoggedIn: state.user.isLoggedIn,
  isResettingPassword: state.user.isResettingPassword,
  name: state.user.name,
  notificationMessage: state.application.notificationMessage,
});

const mapDispatchToProps = (dispatch) => ({
  handleCancelEditProfile: () => dispatch(cancelEditProfile()),
  handleClearFormError: () => dispatch(setNotificationMessage("")),
  handleClickEditProfile: () => dispatch(clickEditProfile()),
  handleEditProfile: () => dispatch(editProfile()),
  handleLogOut: () => dispatch(logOut()),
  handleLogOutAll: () => dispatch(logOutAll()),
  handleSetEditEmail: (editEmail: string) => dispatch(setEditEmail(editEmail)),
  handleSetEditName: (editName: string) => dispatch(setEditName(editName)),
  handleSetIsResettingPassword: (isResettingPassword: boolean) =>
    dispatch(setIsResettingPassword(isResettingPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
