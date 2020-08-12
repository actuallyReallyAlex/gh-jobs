import * as React from "react";
import { connect } from "react-redux";

import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";

import { getHiddenJobsDetails } from "../../redux/thunks";

import { RootState, Job } from "../../types";

export interface HiddenJobsProps {
  handleGetHiddenJobsDetails: () => void;
  hiddenJobsCurrentPage: number;
  hiddenJobsDetails: Job[];
  hiddenJobsTotalPages: number;
}

const HiddenJobs: React.SFC<HiddenJobsProps> = (props: HiddenJobsProps) => {
  const {
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
    <div>
      {jobsOnPage &&
        jobsOnPage.map((job: Job) => <JobCard job={job} key={job.id} />)}
      {jobsOnPage.length > 0 && (
        <Pagination
          currentPage={hiddenJobsCurrentPage}
          totalPages={hiddenJobsTotalPages}
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
  hiddenJobsCurrentPage: state.user.hiddenJobsCurrentPage,
  hiddenJobsDetails: state.user.hiddenJobsDetails,
  hiddenJobsTotalPages: state.user.hiddenJobsTotalPages,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetHiddenJobsDetails: () => dispatch(getHiddenJobsDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HiddenJobs);
