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
}

const Profile: React.SFC<ProfileProps> = (props: ProfileProps) => {
  const { isLoggedIn } = props;

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
      </ProfilePage>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Profile);
