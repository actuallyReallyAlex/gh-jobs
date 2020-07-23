import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Notification from "../components/Notification";
import ProfileDelete from "../components/ProfileDelete";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileEdit from "../components/ProfileEdit";
import ProfileReset from "../components/ProfileReset";

import { NotificationType, RootState } from "../types";

export interface ProfileProps {
  isDeletingProfile: boolean;
  isEditingProfile: boolean;
  isLoggedIn: boolean;
  isResettingPassword: boolean;
  notificationMessage: string;
  notificationType: NotificationType;
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const {
    isDeletingProfile,
    isEditingProfile,
    isLoggedIn,
    isResettingPassword,
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
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <div id="profile-page">
        <form>
          <div className="profile__container__title">
            <span className="avatar">
              <i className="material-icons">account_circle</i>
            </span>
            <h1>{heading}</h1>
          </div>

          {notificationMessage && (
            <Notification
              message={notificationMessage}
              type={notificationType}
            />
          )}

          {isResettingPassword && <ProfileReset />}

          {isEditingProfile && <ProfileEdit />}

          {isDeletingProfile && <ProfileDelete />}

          {!isResettingPassword && !isEditingProfile && !isDeletingProfile && (
            <ProfileDisplay />
          )}
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  isDeletingProfile: state.user.isDeletingProfile,
  isEditingProfile: state.user.isEditingProfile,
  isLoggedIn: state.user.isLoggedIn,
  isResettingPassword: state.user.isResettingPassword,
  notificationMessage: state.application.notificationMessage,
  notificationType: state.application.notificationType,
});

export default connect(mapStateToProps)(Profile);
