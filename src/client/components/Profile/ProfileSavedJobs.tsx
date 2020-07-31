import * as React from "react";
import { connect } from "react-redux";

import JobCard from "../JobCard";
import Pagination from "../Pagination";

import { ProfileSavedContainer, ProfileNoResults } from "./Profile-styled";

import { getSavedJobsDetails } from "../../redux/thunks";

import { RootState, Job } from "../../types";

export interface ProfileSavedJobsProps {
  handleGetSavedJobsDetails: () => void;
  savedJobsCurrentPage: number;
  savedJobsDetails: Job[];
  savedJobsTotalPages: number;
}

const ProfileSavedJobs: React.SFC<ProfileSavedJobsProps> = (
  props: ProfileSavedJobsProps
) => {
  const {
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
  handleGetSavedJobsDetails: () => dispatch(getSavedJobsDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSavedJobs);
