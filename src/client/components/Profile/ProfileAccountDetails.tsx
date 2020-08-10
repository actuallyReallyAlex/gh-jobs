import * as React from "react";
import { connect } from "react-redux";

import Input from "../Input";

import { ProfileAccountDetailsContainer } from "./Profile-styled";

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
      <div>
        <h3>My account</h3>
      </div>
      <div>
        <h4>User Information</h4>
        <form>
          <Input id="email" label="Email" value={email} />
          <Input id="name" label="Name" value={name} />
        </form>
      </div>
    </ProfileAccountDetailsContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(ProfileAccountDetails);
