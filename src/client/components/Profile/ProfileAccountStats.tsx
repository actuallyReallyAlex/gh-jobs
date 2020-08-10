import * as React from "react";
import { connect } from "react-redux";

import Stat from "../Stat";

import {
  ProfileAccountStatsContainer,
  ProfileAccountStatsAvatar,
  ProfileAccountStatsInnerContainer,
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
      <ProfileAccountStatsInnerContainer>
        <Stat figure={hiddenJobs.length} label="Hidden Jobs" />
        <Stat figure={savedJobs.length} label="Saved Jobs" />
      </ProfileAccountStatsInnerContainer>
    </ProfileAccountStatsContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  hiddenJobs: state.user.hiddenJobs,
  name: state.user.name,
  savedJobs: state.user.savedJobs,
});

export default connect(mapStateToProps)(ProfileAccountStats);
