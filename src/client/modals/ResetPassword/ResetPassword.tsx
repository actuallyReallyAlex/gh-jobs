import * as React from "react";
import { connect } from "react-redux";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { ActionsContainer } from "./ResetPassword-styled";

import { displayNotification } from "../../redux/actions/application";
import { setModalContent, setModalTitle } from "../../redux/actions/modal";
import { resetPassword } from "../../redux/thunks";

export interface ResetPasswordProps {
  handleCancelResetPassword: () => void;
  handleResetPassword: (
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => void;
}

const ResetPassword: React.SFC<ResetPasswordProps> = (
  props: ResetPasswordProps
) => {
  const [resetCurrentPassword, setResetCurrentPassword] = React.useState("");
  const [resetNewPassword, setResetNewPassword] = React.useState("");
  const [resetConfirmNewPassword, setResetConfirmNewPassword] = React.useState(
    ""
  );

  const { handleCancelResetPassword, handleResetPassword } = props;

  return (
    <div>
      <Input
        autoComplete="current-password"
        full
        icon="lock"
        id="current-password"
        label="Current Password"
        onChange={(e) => setResetCurrentPassword(e.target.value)}
        type="password"
        value={resetCurrentPassword}
      />

      <Input
        autoComplete="new-password"
        full
        icon="lock"
        id="new-password"
        label="New Password"
        onChange={(e) => setResetNewPassword(e.target.value)}
        type="password"
        value={resetNewPassword}
      />

      <Input
        autoComplete="new-password"
        full
        icon="lock"
        id="confirm-new-password"
        label="Confirm New Password"
        onChange={(e) => setResetConfirmNewPassword(e.target.value)}
        type="password"
        value={resetConfirmNewPassword}
      />

      <ActionsContainer>
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
          onClick={() =>
            handleResetPassword(
              resetCurrentPassword,
              resetNewPassword,
              resetConfirmNewPassword
            )
          }
          type="button"
        />
      </ActionsContainer>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleCancelResetPassword: () => {
    dispatch(displayNotification("", "default"));
    dispatch(setModalContent("settings"));
    dispatch(setModalTitle("Settings"));
  },
  handleResetPassword: (
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => {
    if (newPassword !== confirmNewPassword) {
      dispatch(displayNotification("Passwords do not match.", "error"));
      return;
    }
    dispatch(resetPassword(currentPassword, newPassword));
  },
});

export default connect(null, mapDispatchToProps)(ResetPassword);
