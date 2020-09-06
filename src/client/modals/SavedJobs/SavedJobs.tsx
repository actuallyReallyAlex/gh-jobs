import * as React from "react";
import { connect } from "react-redux";

import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";

import { getSavedJobsDetails } from "../../redux/thunks/user";

import { RootState, Job } from "../../types";

export interface SavedJobsProps {
  currentPage: number;
  handleGetSavedJobsDetails: () => void;
  savedJobs: string[];
  savedJobsDetails: Job[];
}

const SavedJobs: React.SFC<SavedJobsProps> = (props: SavedJobsProps) => {
  const {
    currentPage,
    handleGetSavedJobsDetails,
    savedJobs,
    savedJobsDetails,
  } = props;

  const [jobsOnPage, setJobsOnPage] = React.useState([]);

  React.useEffect((): void => {
    if (savedJobsDetails) {
      setJobsOnPage(
        savedJobsDetails.slice(currentPage * 5 - 5, currentPage * 5)
      );
    }
  }, [savedJobsDetails]);

  React.useEffect(() => {
    if (savedJobs && SavedJobs.length > 0) {
      if (savedJobsDetails.length === 0) {
        handleGetSavedJobsDetails();
      }
    } else {
      setJobsOnPage([]);
    }
  }, [savedJobs]);

  React.useEffect(() => {
    setJobsOnPage(savedJobsDetails.slice(currentPage * 5 - 5, currentPage * 5));
  }, [currentPage]);

  const pages = savedJobs ? Math.ceil(savedJobs.length / 5) : 1;

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
  savedJobs: state.user.savedJobs,
  savedJobsDetails: state.user.savedJobsDetails,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetSavedJobsDetails: () => dispatch(getSavedJobsDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedJobs);
