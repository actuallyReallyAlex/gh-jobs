import * as React from "react";
import { connect } from "react-redux";

import Button from "../../components/Button";

import { Container, Row } from "./Settings-styled";

import { displayNotification } from "../../redux/actions/application";
import { setModalContent, setModalTitle } from "../../redux/actions/modal";
import { logOut } from "../../redux/thunks/user";

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
    <Container>
      <Row>
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
      </Row>
      <Row>
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
      </Row>
    </Container>
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
  handleLogOutAll: () => dispatch(logOut(true)),
});

export default connect(null, mapDispatchToProps)(Settings);
