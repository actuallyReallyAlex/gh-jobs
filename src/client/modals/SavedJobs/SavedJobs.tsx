import * as React from "react";
import { connect } from "react-redux";

import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";

import { getSavedJobsDetails } from "../../redux/thunks";

import { RootState, Job } from "../../types";

export interface SavedJobsProps {
  handleGetSavedJobsDetails: () => void;
  savedJobsCurrentPage: number;
  savedJobsDetails: Job[];
  savedJobsTotalPages: number;
}

const SavedJobs: React.SFC<SavedJobsProps> = (props: SavedJobsProps) => {
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
    <div>
      {jobsOnPage &&
        jobsOnPage.map((job: Job) => <JobCard job={job} key={job.id} />)}
      {jobsOnPage.length > 0 && (
        <Pagination
          currentPage={savedJobsCurrentPage}
          totalPages={savedJobsTotalPages}
        />
      )}
      {jobsOnPage.length === 0 && (
        <div id="no-results">
          No results. Please modify your search and try again.
        </div>
      )}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedJobs);
