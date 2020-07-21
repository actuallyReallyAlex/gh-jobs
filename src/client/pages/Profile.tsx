import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../components/Button";
import FormError from "../components/FormError";
import Input from "../components/Input";

import {
  setEditEmail,
  setEditName,
  setIsResettingPassword,
  setResetConfirmNewPassword,
  setResetCurrentPassword,
  setResetNewPassword,
  setFormError,
} from "../redux/actions/user";
import {
  logOut,
  logOutAll,
  resetPassword,
  cancelResetPassword,
  clickEditProfile,
  cancelEditProfile,
  editProfile,
} from "../redux/thunks";

import { RootState } from "../types";

export interface ProfileProps {
  editEmail: string;
  editName: string;
  email: string;
  formError: string;
  handleCancelEditProfile: () => void;
  handleCancelResetPassword: () => void;
  handleClearFormError: () => void;
  handleClickEditProfile: () => void;
  handleEditProfile: () => void;
  handleLogOut: () => void;
  handleLogOutAll: () => void;
  handleResetPassword: () => void;
  handleSetEditEmail: (editEmail: string) => void;
  handleSetEditName: (editName: string) => void;
  handleSetIsResettingPassword: (isResettingPassword: boolean) => void;
  handleSetResetConfirmNewPassword: (resetConfirmNewPassword: string) => void;
  handleSetResetCurrentPassword: (resetCurrentPassword: string) => void;
  handleSetResetNewPassword: (resetNewPassword: string) => void;
  isEditingProfile: boolean;
  isLoggedIn: boolean;
  isResettingPassword: boolean;
  name: string;
  resetConfirmNewPassword: string;
  resetCurrentPassword: string;
  resetNewPassword: string;
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const {
    editEmail,
    editName,
    email,
    formError,
    handleCancelEditProfile,
    handleCancelResetPassword,
    handleClearFormError,
    handleClickEditProfile,
    handleEditProfile,
    handleLogOut,
    handleLogOutAll,
    handleResetPassword,
    handleSetEditEmail,
    handleSetEditName,
    handleSetIsResettingPassword,
    handleSetResetConfirmNewPassword,
    handleSetResetCurrentPassword,
    handleSetResetNewPassword,
    isEditingProfile,
    isLoggedIn,
    isResettingPassword,
    name,
    resetConfirmNewPassword,
    resetCurrentPassword,
    resetNewPassword,
  } = props;

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
            <h1>{!isResettingPassword ? "Profile" : "Reset Password"}</h1>
          </div>

          {formError && <FormError error={formError} />}

          {isResettingPassword && (
            <>
              <Input
                autoComplete="current-password"
                icon="lock"
                id="current-password"
                label="Current Password"
                onChange={(e) => handleSetResetCurrentPassword(e.target.value)}
                type="password"
                value={resetCurrentPassword}
              />

              <Input
                autoComplete="new-password"
                icon="lock"
                id="new-password"
                label="New Password"
                onChange={(e) => handleSetResetNewPassword(e.target.value)}
                type="password"
                value={resetNewPassword}
              />

              <Input
                autoComplete="new-password"
                icon="lock"
                id="confirm-new-password"
                label="Confirm New Password"
                onChange={(e) =>
                  handleSetResetConfirmNewPassword(e.target.value)
                }
                type="password"
                value={resetConfirmNewPassword}
              />

              <div className="profile__container__actions">
                <Button
                  id="cancel"
                  label="Cancel"
                  onClick={() => handleCancelResetPassword()}
                  style="secondary"
                  type="button"
                />
                {/* TODO - Disabled State */}
                <Button
                  id="reset"
                  label="Confirm reset"
                  onClick={() => handleResetPassword()}
                  style="danger"
                  type="button"
                />
              </div>
            </>
          )}

          {!isResettingPassword && isEditingProfile && (
            <>
              <Input
                icon="account_circle"
                id="name"
                label="Name"
                onChange={(e) => handleSetEditName(e.target.value)}
                type="text"
                value={editName}
              />

              <Input
                icon="email"
                id="email"
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
                {/* TODO - Disabled State */}
                <Button
                  id="edit"
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
  formError: state.user.formError,
  isEditingProfile: state.user.isEditingProfile,
  isLoggedIn: state.user.isLoggedIn,
  isResettingPassword: state.user.isResettingPassword,
  name: state.user.name,
  resetConfirmNewPassword: state.user.resetConfirmNewPassword,
  resetCurrentPassword: state.user.resetCurrentPassword,
  resetNewPassword: state.user.resetNewPassword,
});

const mapDispatchToProps = (dispatch) => ({
  handleCancelEditProfile: () => dispatch(cancelEditProfile()),
  handleCancelResetPassword: () => dispatch(cancelResetPassword()),
  handleClearFormError: () => dispatch(setFormError("")),
  handleClickEditProfile: () => dispatch(clickEditProfile()),
  handleEditProfile: () => dispatch(editProfile()),
  handleLogOut: () => dispatch(logOut()),
  handleLogOutAll: () => dispatch(logOutAll()),
  handleResetPassword: () => dispatch(resetPassword()),
  handleSetEditEmail: (editEmail: string) => dispatch(setEditEmail(editEmail)),
  handleSetEditName: (editName: string) => dispatch(setEditName(editName)),
  handleSetIsResettingPassword: (isResettingPassword: boolean) =>
    dispatch(setIsResettingPassword(isResettingPassword)),
  handleSetResetConfirmNewPassword: (resetConfirmNewPassword: string) =>
    dispatch(setResetConfirmNewPassword(resetConfirmNewPassword)),
  handleSetResetCurrentPassword: (resetCurrentPassword: string) =>
    dispatch(setResetCurrentPassword(resetCurrentPassword)),
  handleSetResetNewPassword: (resetNewPassword: string) =>
    dispatch(setResetNewPassword(resetNewPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
