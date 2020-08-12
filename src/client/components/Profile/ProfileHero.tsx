import * as React from "react";
import { connect } from "react-redux";

import { ProfileHeroContainer } from "./Profile-styled";

import Button from "../Button";

import { setIsEditingProfile } from "../../redux/actions/user";

import { RootState } from "../../types";

export interface ProfileHeroProps {
  handleEditProfile: () => void;
  name: string;
}

const ProfileHero: React.SFC<ProfileHeroProps> = (props: ProfileHeroProps) => {
  const { handleEditProfile, name } = props;

  const firstName = name.split(/ /gm)[0];

  return (
    <ProfileHeroContainer id="profile-hero">
      <h2>Hello, {firstName}</h2>
      <p>
        This is your profile page. You can view your favorite job listings, and
        manage your information.
      </p>
      <Button
        buttonStyle="primary"
        label="Edit profile"
        id="edit-profile"
        onClick={() => handleEditProfile()}
        type="button"
      />
    </ProfileHeroContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  handleEditProfile: () => dispatch(setIsEditingProfile(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHero);
