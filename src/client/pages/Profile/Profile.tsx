import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  ProfileAccountDetails,
  ProfileAccountStats,
  ProfileHero,
} from "../../components/Profile";

import {
  ProfileInnerContainer,
  ProfilePage,
} from "../../components/Profile/Profile-styled";

import { RootState } from "../../types";

export interface ProfileProps {
  isLoggedIn: boolean;
  redirectPath: string;
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const { isLoggedIn, redirectPath } = props;

  if (redirectPath) {
    return <Redirect to={redirectPath} />;
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <ProfilePage id="profile-page">
      <ProfileHero />
      <ProfileInnerContainer>
        <ProfileAccountDetails />
        <ProfileAccountStats />
      </ProfileInnerContainer>
    </ProfilePage>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.user.isLoggedIn,
  redirectPath: state.application.redirectPath,
});

export default connect(mapStateToProps)(Profile);
