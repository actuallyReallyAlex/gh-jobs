import * as React from "react";
import { connect } from "react-redux";

import JobCard from "../JobCard";
import Pagination from "../Pagination";

import {
  ProfileSavedContainer,
  ProfileNoResults,
  ProfileBackButton,
} from "./Profile-styled";

import { setIsViewingSavedJobs } from "../../redux/actions/user";
import { getHiddenJobsDetails } from "../../redux/thunks";

import { RootState, Job } from "../../types";

export interface ProfileHiddenJobsProps {
  handleBackToProfile: () => void;
  handleGetHiddenJobsDetails: () => void;
  hiddenJobsCurrentPage: number;
  hiddenJobsDetails: Job[];
  hiddenJobsTotalPages: number;
}

const ProfileHiddenJobs: React.SFC<ProfileHiddenJobsProps> = (
  props: ProfileHiddenJobsProps
) => {
  const {
    handleBackToProfile,
    handleGetHiddenJobsDetails,
    hiddenJobsCurrentPage,
    hiddenJobsDetails,
    hiddenJobsTotalPages,
  } = props;

  const jobsOnPage =
    hiddenJobsDetails &&
    hiddenJobsDetails.slice(
      hiddenJobsCurrentPage * 5 - 5,
      hiddenJobsCurrentPage * 5
    );

  React.useEffect((): void => {
    handleGetHiddenJobsDetails();
  }, []);

  return (
    <>
      <ProfileBackButton
        id="back-to-profile"
        onClick={() => handleBackToProfile()}
      >
        <i className="material-icons">west</i>
        <span>Back to profile</span>
      </ProfileBackButton>
      <ProfileSavedContainer>
        {jobsOnPage &&
          jobsOnPage.map((job: Job) => <JobCard job={job} key={job.id} />)}
        {jobsOnPage.length > 0 && (
          <Pagination
            currentPage={hiddenJobsCurrentPage}
            totalPages={hiddenJobsTotalPages}
          />
        )}
        {jobsOnPage.length === 0 && (
          <ProfileNoResults id="no-results">
            No results. Please modify your search and try again.
          </ProfileNoResults>
        )}
      </ProfileSavedContainer>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  hiddenJobsCurrentPage: state.user.hiddenJobsCurrentPage,
  hiddenJobsDetails: state.user.hiddenJobsDetails,
  hiddenJobsTotalPages: state.user.hiddenJobsTotalPages,
});

const mapDispatchToProps = (dispatch) => ({
  handleBackToProfile: () => dispatch(setIsViewingSavedJobs(false)),
  handleGetHiddenJobsDetails: () => dispatch(getHiddenJobsDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHiddenJobs);
