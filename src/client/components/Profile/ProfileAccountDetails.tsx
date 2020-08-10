import * as React from "react";
import { connect } from "react-redux";

import Input from "../Input";

import {
  ProfileAccountDetailsContentContainer,
  ProfileAccountDetailsHeadingContainer,
  ProfileAccountDetailsContainer,
} from "./Profile-styled";

import { RootState } from "../../types";

export interface ProfileAccountDetailsProps {
  email: string;
  name: string;
}

const ProfileAccountDetails: React.SFC<ProfileAccountDetailsProps> = (
  props: ProfileAccountDetailsProps
) => {
  const { email, name } = props;
  return (
    <ProfileAccountDetailsContainer>
      <ProfileAccountDetailsHeadingContainer>
        <h3>My account</h3>
      </ProfileAccountDetailsHeadingContainer>
      <ProfileAccountDetailsContentContainer>
        <h4>User Information</h4>
        <form>
          <Input
            disabled
            full
            icon="account_circle"
            id="name"
            label="Name"
            type="text"
            value={name}
          />
          <Input
            disabled
            full
            icon="email"
            id="email"
            label="Email Address"
            type="email"
            value={email}
          />
        </form>
      </ProfileAccountDetailsContentContainer>
    </ProfileAccountDetailsContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(ProfileAccountDetails);
