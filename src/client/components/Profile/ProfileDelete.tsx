import * as React from "react";
import { connect } from "react-redux";

import Button from "../Button";

import { ProfileActionsContainer } from "./Profile-styled";

import { cancelDeleteProfile, deleteProfile } from "../../redux/thunks";

export interface ProfileDeleteProps {
  handleCancelDeleteProfile: () => void;
  handleDeleteProfile: () => void;
}

const ProfileDelete: React.SFC<ProfileDeleteProps> = (
  props: ProfileDeleteProps
) => {
  const { handleCancelDeleteProfile, handleDeleteProfile } = props;
  return (
    <>
      <ProfileActionsContainer>
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
      </ProfileActionsContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleCancelDeleteProfile: () => dispatch(cancelDeleteProfile()),
  handleDeleteProfile: () => dispatch(deleteProfile()),
});

export default connect(null, mapDispatchToProps)(ProfileDelete);
