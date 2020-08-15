import * as React from "react";
import { connect } from "react-redux";

import Button from "../Button";
import Stat from "../Stat";

import {
  ProfileAccountStatsActionsContainer,
  ProfileAccountStatsAvatar,
  ProfileAccountStatsContainer,
  ProfileAccountStatsInnerContainer,
} from "./Profile-styled";

import { clickViewHiddenJobs, clickViewSavedJobs } from "../../redux/thunks";

import { RootState } from "../../types";

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
      <ProfileAccountStatsActionsContainer>
        <Button
          buttonStyle="primary"
          id="view-hidden-jobs"
          label="Hidden Jobs"
          onClick={() => handleClickViewHiddenJobs()}
          type="button"
        />
        <Button
          buttonStyle="primary"
          id="view-saved-jobs"
          label="Saved Jobs"
          onClick={() => handleClickViewSavedJobs()}
          type="button"
        />
      </ProfileAccountStatsActionsContainer>
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
