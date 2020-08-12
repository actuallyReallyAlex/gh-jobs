import * as React from "react";
import { connect } from "react-redux";

import Button from "../Button";
import Input from "../Input";

import {
  ProfileAccountDetailsContentContainer,
  ProfileAccountDetailsHeadingContainer,
  ProfileAccountDetailsContainer,
} from "./Profile-styled";

import {
  setIsModalOpen,
  setModalContent,
  setModalTitle,
} from "../../redux/actions/modal";
import { setIsEditingProfile } from "../../redux/actions/user";
import { editProfile } from "../../redux/thunks";

import { RootState } from "../../types";

export interface ProfileAccountDetailsProps {
  email: string;
  handleCancelEditProfile: () => void;
  handleEditProfile: (email: string, name: string) => void;
  handleSettingsClick: () => void;
  isEditingProfile: boolean;
  name: string;
}

const ProfileAccountDetails: React.SFC<ProfileAccountDetailsProps> = (
  props: ProfileAccountDetailsProps
) => {
  const {
    email,
    handleCancelEditProfile,
    handleEditProfile,
    handleSettingsClick,
    isEditingProfile,
    name,
  } = props;

  const [newName, setNewName] = React.useState(name);
  const [newEmail, setNewEmail] = React.useState(email);

  return (
    <ProfileAccountDetailsContainer>
      <ProfileAccountDetailsHeadingContainer>
        <h3>My account</h3>
        <Button
          buttonStyle="secondary"
          id="settings"
          label="settings"
          onClick={() => handleSettingsClick()}
          type="button"
        />
      </ProfileAccountDetailsHeadingContainer>
      <ProfileAccountDetailsContentContainer>
        <h4>User Information</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditProfile(newEmail, newName);
          }}
        >
          <Input
            disabled={!isEditingProfile}
            full
            icon="account_circle"
            id="name"
            label="Name"
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            value={newName}
          />
          <Input
            disabled={!isEditingProfile}
            full
            icon="email"
            id="email"
            label="Email Address"
            onChange={(e) => setNewEmail(e.target.value)}
            type="email"
            value={newEmail}
          />
          {isEditingProfile && (
            <div>
              <Button
                buttonStyle="primary"
                disabled={
                  newEmail === "" ||
                  (newEmail === email && newName === name) ||
                  newName === ""
                }
                id="edit-confirm"
                label="Accept changes"
                type="submit"
              />
              <Button
                buttonStyle="secondary"
                id="edit-cancel"
                label="Cancel"
                onClick={() => {
                  setNewName(name);
                  setNewEmail(email);
                  handleCancelEditProfile();
                }}
                type="button"
              />
            </div>
          )}
        </form>
      </ProfileAccountDetailsContentContainer>
    </ProfileAccountDetailsContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  isEditingProfile: state.user.isEditingProfile,
  name: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  handleCancelEditProfile: () => dispatch(setIsEditingProfile(false)),
  handleEditProfile: (email: string, name: string) =>
    dispatch(editProfile(email, name)),
  handleSettingsClick: () => {
    dispatch(setModalContent("settings"));
    dispatch(setModalTitle("Settings"));
    dispatch(setIsModalOpen(true));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileAccountDetails);
