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
}

const HiddenJobs: React.SFC<HiddenJobsProps> = (props: HiddenJobsProps) => {
  const {
    currentPage,
    handleGetHiddenJobsDetails,
    hiddenJobs,
    hiddenJobsDetails,
  } = props;

  const [jobsOnPage, setJobsOnPage] = React.useState([]);

  React.useEffect((): void => {
    if (hiddenJobsDetails) {
      setJobsOnPage(
        hiddenJobsDetails.slice(currentPage * 5 - 5, currentPage * 5)
      );
    }
  }, [hiddenJobsDetails]);

  React.useEffect(() => {
    if (hiddenJobs.length > 0) {
      handleGetHiddenJobsDetails();
    } else {
      setJobsOnPage([]);
    }
  }, [hiddenJobs]);

  const pages = Math.ceil(hiddenJobs.length / 5);

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
});

const mapDispatchToProps = (dispatch) => ({
  handleGetHiddenJobsDetails: () => dispatch(getHiddenJobsDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HiddenJobs);
