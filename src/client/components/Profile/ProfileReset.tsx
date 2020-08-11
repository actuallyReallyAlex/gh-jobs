import * as React from "react";
import { connect } from "react-redux";

import Button from "../Button";
import Input from "../Input";

import { ProfileActionsContainer } from "./Profile-styled";

import {
  setResetConfirmNewPassword,
  setResetCurrentPassword,
  setResetNewPassword,
} from "../../redux/actions/user";
import { cancelResetPassword, resetPassword } from "../../redux/thunks";

import { RootState } from "../../types";

export interface ProfileResetProps {
  handleCancelResetPassword: () => void;
  handleResetPassword: () => void;
  handleSetResetConfirmNewPassword: (resetConfirmNewPassword: string) => void;
  handleSetResetCurrentPassword: (resetCurrentPassword: string) => void;
  handleSetResetNewPassword: (resetNewPassword: string) => void;
  resetConfirmNewPassword: string;
  resetCurrentPassword: string;
  resetNewPassword: string;
}

const ProfileReset: React.SFC<ProfileResetProps> = (
  props: ProfileResetProps
) => {
  const {
    handleCancelResetPassword,
    handleResetPassword,
    handleSetResetConfirmNewPassword,
    handleSetResetCurrentPassword,
    handleSetResetNewPassword,
    resetConfirmNewPassword,
    resetCurrentPassword,
    resetNewPassword,
  } = props;
  return (
    <>
      <Input
        autoComplete="current-password"
        full
        icon="lock"
        id="current-password"
        label="Current Password"
        onChange={(e) => handleSetResetCurrentPassword(e.target.value)}
        type="password"
        value={resetCurrentPassword}
      />

      <Input
        autoComplete="new-password"
        full
        icon="lock"
        id="new-password"
        label="New Password"
        onChange={(e) => handleSetResetNewPassword(e.target.value)}
        type="password"
        value={resetNewPassword}
      />

      <Input
        autoComplete="new-password"
        full
        icon="lock"
        id="confirm-new-password"
        label="Confirm New Password"
        onChange={(e) => handleSetResetConfirmNewPassword(e.target.value)}
        type="password"
        value={resetConfirmNewPassword}
      />

      <ProfileActionsContainer>
        <Button
          buttonStyle="secondary"
          id="cancel"
          label="Cancel"
          onClick={() => handleCancelResetPassword()}
          type="button"
        />
        <Button
          buttonStyle="danger"
          disabled={
            resetCurrentPassword === "" ||
            resetNewPassword === "" ||
            resetConfirmNewPassword === ""
          }
          id="reset"
          label="Confirm reset"
          onClick={() => handleResetPassword()}
          type="button"
        />
      </ProfileActionsContainer>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  resetConfirmNewPassword: state.user.resetConfirmNewPassword,
  resetCurrentPassword: state.user.resetCurrentPassword,
  resetNewPassword: state.user.resetNewPassword,
});

const mapDispatchToProps = (dispatch) => ({
  handleCancelResetPassword: () => dispatch(cancelResetPassword()),
  handleResetPassword: () => dispatch(resetPassword("", "")),
  handleSetResetConfirmNewPassword: (resetConfirmNewPassword: string) =>
    dispatch(setResetConfirmNewPassword(resetConfirmNewPassword)),
  handleSetResetCurrentPassword: (resetCurrentPassword: string) =>
    dispatch(setResetCurrentPassword(resetCurrentPassword)),
  handleSetResetNewPassword: (resetNewPassword: string) =>
    dispatch(setResetNewPassword(resetNewPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileReset);
