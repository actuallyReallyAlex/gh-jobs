import * as React from "react";
import { connect } from "react-redux";

import Button from "../Button";
import Stat from "../Stat";

import {
  ProfileAccountStatsActionsContainer,
  ProfileAccountStatsAvatarContainer,
  ProfileAccountStatsContainer,
  ProfileAccountStatsInnerContainer,
} from "./Profile-styled";

import { clickViewJobs } from "../../redux/thunks/user";

import { RootState } from "../../types";
import Avatar from "../Avatar/Avatar";

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
      <ProfileAccountStatsAvatarContainer>
        <Avatar />
      </ProfileAccountStatsAvatarContainer>
      <h3>{name}</h3>
      <ProfileAccountStatsInnerContainer>
        <Stat figure={hiddenJobs ? hiddenJobs.length : 0} label="Hidden Jobs" />
        <Stat figure={savedJobs ? savedJobs.length : 0} label="Saved Jobs" />
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
  handleClickViewHiddenJobs: () => dispatch(clickViewJobs("hidden")),
  handleClickViewSavedJobs: () => dispatch(clickViewJobs("saved")),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileAccountStats);
