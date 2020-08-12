import * as React from "react";
import { connect } from "react-redux";

import Stat from "../Stat";

import {
  ProfileAccountStatsContainer,
  ProfileAccountStatsAvatar,
  ProfileAccountStatsInnerContainer,
} from "./Profile-styled";

import { RootState } from "../../types";
import Button from "../Button";
import { clickViewHiddenJobs, clickViewSavedJobs } from "../../redux/thunks";

export interface ProfileAccountStatsProps {
  handleClickViewHiddenJobs: () => void;
  handleClickViewSavedJobs: () => void;
  hiddenJobs: string[];
  name: string;
  savedJobs: string[];
}

const ProfileAccountStats: React.SFC<ProfileAccountStatsProps> = (
  props: ProfileAccountStatsProps
) => {
  const {
    handleClickViewHiddenJobs,
    handleClickViewSavedJobs,
    hiddenJobs,
    name,
    savedJobs,
  } = props;
  return (
    <ProfileAccountStatsContainer>
      <ProfileAccountStatsAvatar />
      <h3>{name}</h3>
      <ProfileAccountStatsInnerContainer>
        <Stat figure={hiddenJobs.length} label="Hidden Jobs" />
        <Stat figure={savedJobs.length} label="Saved Jobs" />
      </ProfileAccountStatsInnerContainer>
      <Button
        buttonStyle="primary"
        id="view-hidden-jobs"
        label="View Hidden Jobs"
        onClick={() => handleClickViewHiddenJobs()}
        type="button"
      />
      <Button
        buttonStyle="primary"
        id="view-saved-jobs"
        label="View Saved Jobs"
        onClick={() => handleClickViewSavedJobs()}
        type="button"
      />
    </ProfileAccountStatsContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  hiddenJobs: state.user.hiddenJobs,
  name: state.user.name,
  savedJobs: state.user.savedJobs,
});

const mapDispatchToProps = (dispatch) => ({
  handleClickViewHiddenJobs: () => dispatch(clickViewHiddenJobs()),
  handleClickViewSavedJobs: () => dispatch(clickViewSavedJobs()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileAccountStats);
