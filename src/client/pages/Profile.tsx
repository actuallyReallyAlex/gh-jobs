import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Notification from "../components/Notification";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileEdit from "../components/ProfileEdit";
import ProfileReset from "../components/ProfileReset";

import { RootState } from "../types";

export interface ProfileProps {
  isEditingProfile: boolean;
  isLoggedIn: boolean;
  isResettingPassword: boolean;
  notificationMessage: string;
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const {
    isEditingProfile,
    isLoggedIn,
    isResettingPassword,
    notificationMessage,
  } = props;

  let heading = "Profile";

  if (isResettingPassword) {
    heading = "Reset Password";
  } else if (isEditingProfile) {
    heading = "Edit Profile";
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
            <Notification message={notificationMessage} type="info" />
          )}

          {isResettingPassword && <ProfileReset />}

          {!isResettingPassword && isEditingProfile && <ProfileEdit />}

          {!isResettingPassword && !isEditingProfile && <ProfileDisplay />}
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  isEditingProfile: state.user.isEditingProfile,
  isLoggedIn: state.user.isLoggedIn,
  isResettingPassword: state.user.isResettingPassword,
  notificationMessage: state.application.notificationMessage,
});

export default connect(mapStateToProps)(Profile);
