import * as React from "react";
import { connect } from "react-redux";

import {
  ProfileAccountStatsContainer,
  ProfileAccountStatsAvatar,
} from "./Profile-styled";

import { RootState } from "../../types";

export interface ProfileAccountStatsProps {
  hiddenJobs: string[];
  name: string;
  savedJobs: string[];
}

const ProfileAccountStats: React.SFC<ProfileAccountStatsProps> = (
  props: ProfileAccountStatsProps
) => {
  const { hiddenJobs, name, savedJobs } = props;
  return (
    <ProfileAccountStatsContainer>
      <ProfileAccountStatsAvatar />
      <h2>{name}</h2>
      <span>{hiddenJobs.length} hidden jobs</span>
      <span>{savedJobs.length} saved jobs</span>
    </ProfileAccountStatsContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  hiddenJobs: state.user.hiddenJobs,
  name: state.user.name,
  savedJobs: state.user.savedJobs,
});

export default connect(mapStateToProps)(ProfileAccountStats);
