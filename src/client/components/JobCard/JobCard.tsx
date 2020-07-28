import * as React from "react";
import { connect } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

import {
  StyledContainer,
  StyledLogoContainer,
  StyledLeftContainer,
  StyledLogoNotFoundContainer,
  StyledMiddleContainer,
  StyledCompany,
  StyledTitle,
  StyledFullTime,
  StyledRightContainer,
  StyledActions,
  StyledSavedButton,
  StyledInfoContainer,
  StyledLocationContainer,
  StyledCreatedContainer,
} from "./JobCard-styled";

import { addSavedJob, removeSavedJob } from "../../redux/thunks";

import { Job, RootState } from "../../types";

export interface JobCardProps {
  handleAddSavedJob: (job: Job) => void;
  handleRemoveSavedJob: (job: Job) => void;
  isLoggedIn: boolean;
  job: Job;
  savedJobs: Job[];
}

const JobCard: React.SFC<JobCardProps> = (props: JobCardProps) => {
  const {
    handleAddSavedJob,
    handleRemoveSavedJob,
    isLoggedIn,
    job,
    savedJobs,
  } = props;
  const handleImageError = () => {
    // TODO - Should set the image to a fallback/just display the div with the not found text
    // alert("IMAGE ERROR - CREATE FUNCTIONALITY");
  };

  const jobIsSaved = savedJobs
    ? savedJobs.findIndex((savedJob: Job) => savedJob.id === job.id) >= 0
    : false;

  return (
    <StyledContainer data-cy="job-container">
      <StyledLeftContainer>
        <StyledLogoContainer>
          {job.company_logo ? (
            <img
              alt="Company Logo"
              id={`logo-${job.id}`}
              onError={handleImageError}
              src={job.company_logo}
            />
          ) : (
            <StyledLogoNotFoundContainer>
              <p>not found</p>
            </StyledLogoNotFoundContainer>
          )}
        </StyledLogoContainer>

        <StyledMiddleContainer>
          <StyledCompany>{job.company}</StyledCompany>
          <Link id={job.id} to={`/jobs/${job.id}`}>
            <StyledTitle>{job.title}</StyledTitle>
          </Link>
          {job.type === "Full Time" && (
            <StyledFullTime>Full Time</StyledFullTime>
          )}
        </StyledMiddleContainer>
      </StyledLeftContainer>

      <StyledRightContainer>
        <StyledActions>
          {isLoggedIn && (
            <StyledSavedButton
              data-cy={jobIsSaved ? "selected" : "deselected"}
              id={jobIsSaved ? `remove-job-${job.id}` : `save-job-${job.id}`}
              jobIsSaved={jobIsSaved}
              onClick={
                jobIsSaved
                  ? () => handleRemoveSavedJob(job)
                  : () => handleAddSavedJob(job)
              }
            >
              <i className="material-icons">bookmark</i>
            </StyledSavedButton>
          )}
        </StyledActions>
        <StyledInfoContainer>
          <StyledLocationContainer>
            <i className="material-icons">public</i>
            <p>{job.location}</p>
          </StyledLocationContainer>
          <StyledCreatedContainer>
            <i className="material-icons">access_time</i>
            <p>
              {formatDistanceToNow(new Date(job.created_at), {
                addSuffix: true,
              })}
            </p>
          </StyledCreatedContainer>
        </StyledInfoContainer>
      </StyledRightContainer>
    </StyledContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.user.isLoggedIn,
  savedJobs: state.user.savedJobs,
});

const mapDispatchToProps = (dispatch) => ({
  handleAddSavedJob: (job: Job) => dispatch(addSavedJob(job)),
  handleRemoveSavedJob: (job: Job) => dispatch(removeSavedJob(job)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobCard);