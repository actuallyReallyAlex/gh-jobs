import * as React from "react";
import { connect } from "react-redux";

import Button from "../../components/Button";

import {
  displayNotification,
  setModalContent,
  setModalTitle,
} from "../../redux/actions/application";
import { logOut, logOutAll } from "../../redux/thunks";

export interface SettingsProps {
  handleClickDeleteProfile: () => void;
  handleClickResetPassword: () => void;
  handleLogOut: () => void;
  handleLogOutAll: () => void;
}

const Settings: React.SFC<SettingsProps> = (props: SettingsProps) => {
  const {
    handleClickDeleteProfile,
    handleClickResetPassword,
    handleLogOut,
    handleLogOutAll,
  } = props;

  return (
    <div>
      <Button
        buttonStyle="danger"
        id="log-out"
        label="Log out"
        onClick={() => handleLogOut()}
        type="button"
      />
      <Button
        buttonStyle="danger"
        id="log-out-all"
        label="Log out of all devices"
        onClick={() => handleLogOutAll()}
        type="button"
      />
      <Button
        buttonStyle="danger"
        id="delete-profile"
        label="Delete profile"
        onClick={() => handleClickDeleteProfile()}
        type="button"
      />
      <Button
        buttonStyle="danger"
        id="reset-password"
        label="Reset password"
        onClick={() => handleClickResetPassword()}
        type="button"
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleClickDeleteProfile: () => {
    dispatch(
      displayNotification(
        "Are you sure you would like to delete your profile? This can not be reversed.",
        "warning"
      )
    );
    dispatch(setModalContent("deleteProfile"));
    dispatch(setModalTitle("Delete Profile"));
  },
  handleClickResetPassword: () => {
    dispatch(setModalContent("resetPassword"));
    dispatch(setModalTitle("Reset Password"));
  },
  handleLogOut: () => dispatch(logOut()),
  handleLogOutAll: () => dispatch(logOutAll()),
});

export default connect(null, mapDispatchToProps)(Settings);
