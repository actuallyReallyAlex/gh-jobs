import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  ProfileAccountDetails,
  ProfileAccountStats,
  ProfileDelete,
  ProfileDisplay,
  ProfileEdit,
  ProfileHero,
  ProfileHiddenJobs,
  ProfileReset,
  ProfileSavedJobs,
} from "../../components/Profile";

import {
  ProfilePage,
  ProfileForm,
  ProfileTitleContainer,
  ProfileInnerContainer,
} from "../../components/Profile/Profile-styled";

import { RootState } from "../../types";

export interface ProfileProps {
  isDeletingProfile: boolean;
  isEditingProfile: boolean;
  isLoggedIn: boolean;
  isResettingPassword: boolean;
  isViewingHiddenJobs: boolean;
  isViewingSavedJobs: boolean;
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const {
    isDeletingProfile,
    isEditingProfile,
    isLoggedIn,
    isResettingPassword,
    isViewingHiddenJobs,
    isViewingSavedJobs,
  } = props;

  let heading = "Profile";

  if (isResettingPassword) {
    heading = "Reset Password";
  } else if (isEditingProfile) {
    heading = "Edit Profile";
  } else if (isDeletingProfile) {
    heading = "Delete Profile";
  } else if (isViewingHiddenJobs) {
    heading = "Hidden Jobs";
  } else if (isViewingSavedJobs) {
    heading = "Saved Jobs";
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <ProfilePage id="profile-page">
        <ProfileHero />
        <ProfileInnerContainer>
          <ProfileAccountDetails />
          <ProfileAccountStats />
        </ProfileInnerContainer>

        <ProfileForm
          isViewingHiddenJobs={isViewingHiddenJobs}
          isViewingSavedJobs={isViewingSavedJobs}
          onSubmit={(e) => e.preventDefault()}
        >
          <ProfileTitleContainer>
            <span>
              <i className="material-icons">account_circle</i>
            </span>
            <h1>{heading}</h1>
          </ProfileTitleContainer>

          {isResettingPassword && <ProfileReset />}

          {isEditingProfile && <ProfileEdit />}

          {isDeletingProfile && <ProfileDelete />}

          {isViewingHiddenJobs && <ProfileHiddenJobs />}

          {isViewingSavedJobs && <ProfileSavedJobs />}

          {!isResettingPassword &&
            !isEditingProfile &&
            !isDeletingProfile &&
            !isViewingHiddenJobs &&
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
  isViewingHiddenJobs: state.user.isViewingHiddenJobs,
  isViewingSavedJobs: state.user.isViewingSavedJobs,
});

export default connect(mapStateToProps)(Profile);
