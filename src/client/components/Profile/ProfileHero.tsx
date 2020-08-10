import * as React from "react";
import { connect } from "react-redux";

import { ProfileHeroContainer } from "./Profile-styled";

import { RootState } from "../../types";
import Button from "../Button";

export interface ProfileHeroProps {
  name: string;
}

const ProfileHero: React.SFC<ProfileHeroProps> = (props: ProfileHeroProps) => {
  const { name } = props;
  const firstName = name.split(/ /gm)[0];
  return (
    <ProfileHeroContainer id="profile-hero">
      <h2>Hello, {firstName}</h2>
      <p>
        This is your profile page. You can view your favorite job listings, and
        manage your information.
      </p>
      <Button buttonStyle="primary" label="Edit profile" type="button" />
    </ProfileHeroContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.user.name,
});

export default connect(mapStateToProps)(ProfileHero);
