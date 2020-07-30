import * as React from "react";
import { connect } from "react-redux";

import JobCard from "../JobCard";
import Pagination from "../Pagination";

import { ProfileSavedContainer, ProfileNoResults } from "./Profile-styled";

import { Job, RootState } from "../../types";

export interface ProfileSavedJobsProps {
  savedJobs: Job[];
  savedJobsCurrentPage: number;
  savedJobsTotalPages: number;
}

const ProfileSavedJobs: React.SFC<ProfileSavedJobsProps> = (
  props: ProfileSavedJobsProps
) => {
  const { savedJobs, savedJobsCurrentPage, savedJobsTotalPages } = props;

  const jobsOnPage = savedJobs.slice(
    savedJobsCurrentPage * 5 - 5,
    savedJobsCurrentPage * 5
  );
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
  savedJobs: state.user.savedJobs,
  savedJobsCurrentPage: state.user.savedJobsCurrentPage,
  savedJobsTotalPages: state.user.savedJobsTotalPages,
});

export default connect(mapStateToProps)(ProfileSavedJobs);
