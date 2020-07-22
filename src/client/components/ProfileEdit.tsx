import * as React from "react";
import { connect } from "react-redux";

import Button from "./Button";
import Input from "./Input";

import { setEditEmail, setEditName } from "../redux/actions/user";
import { cancelEditProfile, editProfile } from "../redux/thunks";

import { RootState } from "../types";

export interface ProfileEditProps {
  editEmail: string;
  editName: string;
  email: string;
  handleEditProfile: () => void;
  handleCancelEditProfile: () => void;
  handleSetEditEmail: (editEmail: string) => void;
  handleSetEditName: (editName: string) => void;
  name: string;
}

const ProfileEdit: React.SFC<ProfileEditProps> = (props: ProfileEditProps) => {
  const {
    editEmail,
    editName,
    email,
    handleCancelEditProfile,
    handleEditProfile,
    handleSetEditEmail,
    handleSetEditName,
    name,
  } = props;
  return (
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
  );
};

const mapStateToProps = (state: RootState) => ({
  editEmail: state.user.editEmail,
  editName: state.user.editName,
  email: state.user.email,
  name: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  handleCancelEditProfile: () => dispatch(cancelEditProfile()),
  handleEditProfile: () => dispatch(editProfile()),
  handleSetEditEmail: (editEmail: string) => dispatch(setEditEmail(editEmail)),
  handleSetEditName: (editName: string) => dispatch(setEditName(editName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
