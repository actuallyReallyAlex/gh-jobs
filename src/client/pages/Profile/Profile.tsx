import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  ProfileDelete,
  ProfileDisplay,
  ProfileEdit,
  ProfileReset,
  ProfileSavedJobs,
} from "../../components/Profile";

import {
  ProfilePage,
  ProfileForm,
  ProfileTitleContainer,
} from "../../components/Profile/Profile-styled";

import { NotificationType, RootState } from "../../types";

export interface ProfileProps {
  isDeletingProfile: boolean;
  isEditingProfile: boolean;
  isLoggedIn: boolean;
  isResettingPassword: boolean;
  isViewingSavedJobs: boolean;
  notificationMessage: string;
  notificationType: NotificationType;
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const {
    isDeletingProfile,
    isEditingProfile,
    isLoggedIn,
    isResettingPassword,
    isViewingSavedJobs,
    notificationMessage,
    notificationType,
  } = props;

  let heading = "Profile";

  if (isResettingPassword) {
    heading = "Reset Password";
  } else if (isEditingProfile) {
    heading = "Edit Profile";
  } else if (isDeletingProfile) {
    heading = "Delete Profile";
  } else if (isViewingSavedJobs) {
    heading = "Saved Jobs";
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <ProfilePage id="profile-page">
        <ProfileForm isViewingSavedJobs={isViewingSavedJobs}>
          <ProfileTitleContainer>
            <span>
              <i className="material-icons">account_circle</i>
            </span>
            <h1>{heading}</h1>
          </ProfileTitleContainer>

          {isResettingPassword && <ProfileReset />}

          {isEditingProfile && <ProfileEdit />}

          {isDeletingProfile && <ProfileDelete />}

          {isViewingSavedJobs && <ProfileSavedJobs />}

          {!isResettingPassword &&
            !isEditingProfile &&
            !isDeletingProfile &&
            !isViewingSavedJobs && <ProfileDisplay />}
        </ProfileForm>
      </ProfilePage>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  isDeletingProfile: state.user.isDeletingProfile,
  isEditingProfile: state.user.isEditingProfile,
  isLoggedIn: state.user.isLoggedIn,
  isResettingPassword: state.user.isResettingPassword,
  isViewingSavedJobs: state.user.isViewingSavedJobs,
  notificationMessage: state.application.notificationMessage,
  notificationType: state.application.notificationType,
});

export default connect(mapStateToProps)(Profile);
