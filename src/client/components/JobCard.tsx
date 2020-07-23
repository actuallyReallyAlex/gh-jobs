import * as React from "react";
import { connect } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

import { addSavedJob, removeSavedJob } from "../redux/thunks";

import { Job, RootState } from "../types";

export interface JobCardProps {
  handleAddSavedJob: (job: Job) => void;
  handleRemoveSavedJob: (job: Job) => void;
  job: Job;
  savedJobs: Job[];
}

const JobCard: React.SFC<JobCardProps> = (props: JobCardProps) => {
  const { handleAddSavedJob, handleRemoveSavedJob, job, savedJobs } = props;
  const handleImageError = () => {
    // TODO - Should set the image to a fallback/just display the div with the not found text
    // alert("IMAGE ERROR - CREATE FUNCTIONALITY");
  };

  const jobIsSaved =
    savedJobs.findIndex((savedJob: Job) => savedJob.id === job.id) >= 0;

  return (
    <div className="jobcard__container">
      <div className="jobcard__container__left">
        <div className="jobcard__logo__container">
          {job.company_logo ? (
            <img
              alt="Company Logo"
              id={`logo-${job.id}`}
              onError={handleImageError}
              src={job.company_logo}
            />
          ) : (
            <div className="jobcard__logo__not-found">
              <p>not found</p>
            </div>
          )}
        </div>

        <div className="jobcard__container__middle">
          <p className="jobcard__company">{job.company}</p>
          <Link to={`/jobs/${job.id}`}>
            <p className="jobcard__title">{job.title}</p>
          </Link>
          {job.type === "Full Time" && (
            <p className="jobcard__fulltime">Full Time</p>
          )}
        </div>
      </div>

      <div className="jobcard__container__right">
        <div className="jobcard__actions">
          <button
            className={
              jobIsSaved
                ? "jobcard__save__selected"
                : "jobcard__save__deselected"
            }
            id={jobIsSaved ? `remove-job-${job.id}` : `save-job-${job.id}`}
            onClick={
              jobIsSaved
                ? () => handleRemoveSavedJob(job)
                : () => handleAddSavedJob(job)
            }
          >
            <i className="material-icons">bookmark</i>
          </button>
        </div>
        <div className="jobcard__info">
          <div className="jobcard__location">
            <i className="material-icons">public</i>
            <p>{job.location}</p>
          </div>
          <div className="jobcard__created">
            <i className="material-icons">access_time</i>
            <p>
              {formatDistanceToNow(new Date(job.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  savedJobs: state.user.savedJobs,
});

const mapDispatchToProps = (dispatch) => ({
  handleAddSavedJob: (job: Job) => dispatch(addSavedJob(job)),
  handleRemoveSavedJob: (job: Job) => dispatch(removeSavedJob(job)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobCard);
