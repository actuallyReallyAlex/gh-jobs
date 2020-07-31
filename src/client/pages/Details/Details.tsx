import * as React from "react";
import { connect } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useParams, Link } from "react-router-dom";

import Copyright from "../../components/Copyright";

import {
  DetailsContainer,
  DetailsSideContainer,
  DetailsHowToContainer,
  DetailsHowToLabel,
  DetailsMainContainer,
  DetailsMainTitleContainer,
  DetailsMainInnerTitleContainer,
  DetailsCreatedContainer,
  DetailsCompanyContainer,
  DetailsLogoContainer,
  DetailsCompanyRightContainer,
  DetailsContainerDescription,
} from "./Details-styled";

import { addSavedJob, getJobDetails, removeSavedJob } from "../../redux/thunks";

import { Job, RootState } from "../../types";

interface DetailsProps {
  handleAddSavedJob: (job: Job) => void;
  handleGetJobDetails: (id: string) => void;
  handleRemoveSavedJob: (job: Job) => void;
  jobDetails: Job;
  isLoggedIn: boolean;
  savedJobs: Job[];
}

const Details: React.SFC<DetailsProps> = (props: DetailsProps) => {
  const { id } = useParams();
  const {
    handleAddSavedJob,
    handleGetJobDetails,
    handleRemoveSavedJob,
    jobDetails,
    isLoggedIn,
    savedJobs,
  } = props;

  const [applyLink, setApplyLink] = React.useState("");

  React.useEffect((): void => {
    window.scrollTo(0, 0);
    handleGetJobDetails(id);
  }, []);

  const jobIsSaved =
    savedJobs && jobDetails
      ? savedJobs.findIndex((savedJob: Job) => savedJob.id === jobDetails.id) >=
        0
      : false;

  React.useEffect((): void => {
    if (jobDetails) {
      const isPlainLink = jobDetails.how_to_apply.slice(0, 5) === "<p><a";

      if (isPlainLink) {
        const href = jobDetails.how_to_apply
          .split(/(<p><a href=")/gm)[2]
          .split(/(<\/a><\/p>)/gm)[0]
          .split(/">/gm)[0];

        setApplyLink(href);
      }
    }
  }, [jobDetails]);

  return (
    <>
      <DetailsContainer>
        <DetailsSideContainer>
          <Link id="back-to-search" to="/">
            <i className="material-icons">west</i>
            <span>Back to search</span>
          </Link>
          <DetailsHowToContainer>
            <DetailsHowToLabel id="how-to-label">
              How to Apply
            </DetailsHowToLabel>
            {jobDetails &&
              (applyLink ? (
                <a
                  href={applyLink}
                  rel="noopener noreferrer"
                  style={{ marginTop: "16px" }}
                  target="_blank"
                >
                  <i className="material-icons">link</i>
                  <span>Apply</span>
                </a>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: jobDetails.how_to_apply }}
                />
              ))}
          </DetailsHowToContainer>
        </DetailsSideContainer>

        <DetailsMainContainer>
          {jobDetails && (
            <>
              <DetailsMainTitleContainer>
                <DetailsMainInnerTitleContainer jobIsSaved={jobIsSaved}>
                  <h2 id="details-title">{jobDetails.title}</h2>
                  <div>
                    {jobDetails.type === "Full Time" && (
                      <p id="full-time-indicator">Full Time</p>
                    )}
                    {isLoggedIn && (
                      <button
                        id={
                          jobIsSaved
                            ? `remove-job-${jobDetails.id}`
                            : `save-job-${jobDetails.id}`
                        }
                        onClick={
                          jobIsSaved
                            ? () => handleRemoveSavedJob(jobDetails)
                            : () => handleAddSavedJob(jobDetails)
                        }
                      >
                        <i className="material-icons">bookmark</i>
                      </button>
                    )}
                  </div>
                </DetailsMainInnerTitleContainer>

                <DetailsCreatedContainer>
                  <i className="material-icons">access_time</i>
                  <p>
                    {formatDistanceToNow(new Date(jobDetails.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </DetailsCreatedContainer>
              </DetailsMainTitleContainer>

              <DetailsCompanyContainer>
                <DetailsLogoContainer>
                  {jobDetails.company_logo ? (
                    <img
                      alt="Company Logo"
                      id={`logo-${jobDetails.id}`}
                      // onError={handleImageError}
                      src={jobDetails.company_logo}
                    />
                  ) : (
                    <div>
                      <p>not found</p>
                    </div>
                  )}
                </DetailsLogoContainer>

                <DetailsCompanyRightContainer>
                  {jobDetails.company_url ? (
                    <a
                      href={jobDetails.company_url}
                      id="details-company-name"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {jobDetails.company}
                    </a>
                  ) : (
                    <p id="details-company-name">{jobDetails.company}</p>
                  )}

                  <div>
                    <i className="material-icons">public</i>
                    <p>{jobDetails.location}</p>
                  </div>
                </DetailsCompanyRightContainer>
              </DetailsCompanyContainer>

              <DetailsContainerDescription>
                <div
                  dangerouslySetInnerHTML={{ __html: jobDetails.description }}
                />
              </DetailsContainerDescription>
            </>
          )}
        </DetailsMainContainer>
      </DetailsContainer>
      <Copyright />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.user.isLoggedIn,
  jobDetails: state.application.jobDetails,
  savedJobs: state.user.savedJobs,
});

const mapDispatchToProps = (dispatch) => ({
  handleAddSavedJob: (job: Job) => dispatch(addSavedJob(job)),
  handleGetJobDetails: (id: string) => dispatch(getJobDetails(id)),
  handleRemoveSavedJob: (job: Job) => dispatch(removeSavedJob(job)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
