import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../components/Button";
import Notification from "../components/Notification";
import Input from "../components/Input";

import { setNotificationMessage } from "../redux/actions/application";
import { setIsResettingPassword } from "../redux/actions/user";
import { clickEditProfile, logOut, logOutAll } from "../redux/thunks";

import { RootState } from "../types";
import ProfileEdit from "../components/ProfileEdit";
import ProfileReset from "../components/ProfileReset";

export interface ProfileProps {
  email: string;
  handleClearFormError: () => void;
  handleClickEditProfile: () => void;
  handleLogOut: () => void;
  handleLogOutAll: () => void;
  handleSetIsResettingPassword: (isResettingPassword: boolean) => void;
  isEditingProfile: boolean;
  isLoggedIn: boolean;
  isResettingPassword: boolean;
  name: string;
  notificationMessage: string;
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const {
    email,
    handleClearFormError,
    handleClickEditProfile,
    handleLogOut,
    handleLogOutAll,
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

          {!isResettingPassword && isEditingProfile && <ProfileEdit />}

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
  email: state.user.email,
  isEditingProfile: state.user.isEditingProfile,
  isLoggedIn: state.user.isLoggedIn,
  isResettingPassword: state.user.isResettingPassword,
  name: state.user.name,
  notificationMessage: state.application.notificationMessage,
});

const mapDispatchToProps = (dispatch) => ({
  handleClearFormError: () => dispatch(setNotificationMessage("")),
  handleClickEditProfile: () => dispatch(clickEditProfile()),
  handleLogOut: () => dispatch(logOut()),
  handleLogOutAll: () => dispatch(logOutAll()),
  handleSetIsResettingPassword: (isResettingPassword: boolean) =>
    dispatch(setIsResettingPassword(isResettingPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
