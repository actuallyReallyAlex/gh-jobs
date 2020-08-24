import * as React from "react";
import { connect } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link, Redirect, useParams } from "react-router-dom";

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
  DetailsSavedJobButton,
  DetailsHiddenJobButton,
} from "./Details-styled";

import {
  addHiddenJob,
  addSavedJob,
  removeHiddenJob,
  removeSavedJob,
} from "../../redux/thunks/user";
import { getJobDetails } from "../../redux/thunks/application";

import { Job, RootState } from "../../types";

interface DetailsProps {
  handleAddSavedJob: (id: string) => void;
  handleHideJob: (id: string) => void;
  handleGetJobDetails: (id: string) => void;
  handleRemoveSavedJob: (id: string) => void;
  handleShowJob: (id: string) => void;
  hiddenJobs: string[];
  jobDetails: Job;
  isLoggedIn: boolean;
  redirectPath: string;
  savedJobs: string[];
}

const Details: React.SFC<DetailsProps> = (props: DetailsProps) => {
  const { id } = useParams();
  const {
    handleAddSavedJob,
    handleHideJob,
    handleGetJobDetails,
    handleRemoveSavedJob,
    handleShowJob,
    hiddenJobs,
    jobDetails,
    isLoggedIn,
    redirectPath,
    savedJobs,
  } = props;

  const [applyLink, setApplyLink] = React.useState("");

  React.useEffect((): void => {
    window.scrollTo(0, 0);
    handleGetJobDetails(id);
  }, []);

  const jobIsSaved =
    savedJobs && jobDetails
      ? savedJobs.findIndex(
          (savedJobID: string) => savedJobID === jobDetails.id
        ) >= 0
      : false;

  const jobIsHidden =
    hiddenJobs && jobDetails
      ? hiddenJobs.findIndex(
          (hiddenJobID: string) => hiddenJobID === jobDetails.id
        ) >= 0
      : false;

  React.useEffect((): void => {
    if (jobDetails) {
      const isPlainLink = jobDetails.howToApply.slice(0, 5) === "<p><a";

      if (isPlainLink) {
        const href = jobDetails.howToApply
          .split(/(<p><a href=")/gm)[2]
          .split(/(<\/a><\/p>)/gm)[0]
          .split(/">/gm)[0];

        setApplyLink(href);
      }
    }
  }, [jobDetails]);

  if (redirectPath) {
    return <Redirect to={redirectPath} />;
  }

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
                  dangerouslySetInnerHTML={{ __html: jobDetails.howToApply }}
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
                      <>
                        <DetailsSavedJobButton
                          disabled={jobIsHidden}
                          id={
                            jobIsSaved
                              ? `remove-job-${jobDetails.id}`
                              : `save-job-${jobDetails.id}`
                          }
                          jobIsSaved={jobIsSaved}
                          onClick={
                            jobIsSaved
                              ? () => handleRemoveSavedJob(jobDetails.id)
                              : () => handleAddSavedJob(jobDetails.id)
                          }
                        >
                          <i className="material-icons">bookmark</i>
                        </DetailsSavedJobButton>
                        <DetailsHiddenJobButton
                          disabled={jobIsSaved}
                          id={
                            jobIsHidden
                              ? `show-job-${jobDetails.id}`
                              : `hide-job-${jobDetails.id}`
                          }
                          jobIsHidden={jobIsHidden}
                          onClick={
                            jobIsHidden
                              ? () => handleShowJob(jobDetails.id)
                              : () => handleHideJob(jobDetails.id)
                          }
                        >
                          <i className="material-icons">block</i>
                        </DetailsHiddenJobButton>
                      </>
                    )}
                  </div>
                </DetailsMainInnerTitleContainer>

                <DetailsCreatedContainer>
                  <i className="material-icons">access_time</i>
                  <p>
                    {formatDistanceToNow(new Date(jobDetails.listingDate), {
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
  hiddenJobs: state.user.hiddenJobs,
  isLoggedIn: state.user.isLoggedIn,
  jobDetails: state.application.jobDetails,
  redirectPath: state.application.redirectPath,
  savedJobs: state.user.savedJobs,
});

const mapDispatchToProps = (dispatch) => ({
  handleAddSavedJob: (id: string) => dispatch(addSavedJob(id)),
  handleHideJob: (id: string) => dispatch(addHiddenJob(id)),
  handleGetJobDetails: (id: string) => dispatch(getJobDetails(id)),
  handleRemoveSavedJob: (id: string) => dispatch(removeSavedJob(id)),
  handleShowJob: (id: string) => dispatch(removeHiddenJob(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
