import * as React from "react";
import { connect } from "react-redux";

import Button from "../../components/Button";

import {
  displayNotification,
  setModalContent,
  setModalTitle,
} from "../../redux/actions/application";
import { deleteProfile } from "../../redux/thunks";

export interface DeleteProfileProps {
  handleCancelDeleteProfile: () => void;
  handleDeleteProfile: () => void;
}

const DeleteProfile: React.SFC<DeleteProfileProps> = (
  props: DeleteProfileProps
) => {
  const { handleCancelDeleteProfile, handleDeleteProfile } = props;

  return (
    <div>
      <Button
        buttonStyle="secondary"
        id="cancel"
        label="Cancel"
        onClick={() => handleCancelDeleteProfile()}
        type="button"
      />
      <Button
        buttonStyle="danger"
        id="delete-profile-confirm"
        label="Delete profile"
        onClick={() => handleDeleteProfile()}
        type="button"
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleCancelDeleteProfile: () => {
    dispatch(displayNotification("", "default"));
    dispatch(setModalContent("settings"));
    dispatch(setModalTitle("Settings"));
  },
  handleDeleteProfile: () => dispatch(deleteProfile()),
});

export default connect(null, mapDispatchToProps)(DeleteProfile);
