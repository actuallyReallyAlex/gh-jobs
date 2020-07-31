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
import { getSavedJobsDetails } from "../../redux/thunks";

import { RootState, Job } from "../../types";

export interface ProfileSavedJobsProps {
  handleBackToProfile: () => void;
  handleGetSavedJobsDetails: () => void;
  savedJobsCurrentPage: number;
  savedJobsDetails: Job[];
  savedJobsTotalPages: number;
}

const ProfileSavedJobs: React.SFC<ProfileSavedJobsProps> = (
  props: ProfileSavedJobsProps
) => {
  const {
    handleBackToProfile,
    handleGetSavedJobsDetails,
    savedJobsCurrentPage,
    savedJobsDetails,
    savedJobsTotalPages,
  } = props;

  const jobsOnPage =
    savedJobsDetails &&
    savedJobsDetails.slice(
      savedJobsCurrentPage * 5 - 5,
      savedJobsCurrentPage * 5
    );

  React.useEffect((): void => {
    handleGetSavedJobsDetails();
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
            currentPage={savedJobsCurrentPage}
            totalPages={savedJobsTotalPages}
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
  savedJobsCurrentPage: state.user.savedJobsCurrentPage,
  savedJobsDetails: state.user.savedJobsDetails,
  savedJobsTotalPages: state.user.savedJobsTotalPages,
});

const mapDispatchToProps = (dispatch) => ({
  handleBackToProfile: () => dispatch(setIsViewingSavedJobs(false)),
  handleGetSavedJobsDetails: () => dispatch(getSavedJobsDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSavedJobs);
