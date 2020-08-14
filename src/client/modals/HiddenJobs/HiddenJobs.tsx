import * as React from "react";
import { connect } from "react-redux";

import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";

import { getHiddenJobsDetails } from "../../redux/thunks";

import { RootState, Job } from "../../types";

export interface HiddenJobsProps {
  currentPage: number;
  handleGetHiddenJobsDetails: () => void;
  hiddenJobs: string[];
  hiddenJobsDetails: Job[];
  totalPages: number;
}

const HiddenJobs: React.SFC<HiddenJobsProps> = (props: HiddenJobsProps) => {
  const {
    currentPage,
    handleGetHiddenJobsDetails,
    hiddenJobs,
    hiddenJobsDetails,
    totalPages,
  } = props;

  const jobsOnPage =
    hiddenJobsDetails &&
    hiddenJobsDetails.slice(currentPage * 5 - 5, currentPage * 5);

  const pages = Math.ceil(hiddenJobs.length / 5);

  React.useEffect((): void => {
    if (hiddenJobs.length > 0) {
      handleGetHiddenJobsDetails();
    }
  }, [totalPages]);

  return (
    <div>
      {jobsOnPage &&
        jobsOnPage.map((job: Job) => <JobCard job={job} key={job.id} />)}
      {jobsOnPage.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={pages} />
      )}
      {jobsOnPage.length === 0 && <div id="no-results">No results.</div>}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentPage: state.application.currentPage,
  hiddenJobs: state.user.hiddenJobs,
  hiddenJobsDetails: state.user.hiddenJobsDetails,
  totalPages: state.application.totalPages,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetHiddenJobsDetails: () => dispatch(getHiddenJobsDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HiddenJobs);
