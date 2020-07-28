import * as React from "react";
import { connect } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useParams, Link } from "react-router-dom";

import Copyright from "../../components/Copyright";
import Notification from "../../components/Notification";

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

import { addSavedJob, removeSavedJob } from "../../redux/thunks";

import { Job, NotificationType, RootState } from "../../types";

interface DetailsProps {
  handleAddSavedJob: (job: Job) => void;
  handleRemoveSavedJob: (job: Job) => void;
  isLoggedIn: boolean;
  jobs: Job[];
  notificationMessage: string;
  notificationType: NotificationType;
  savedJobs: Job[];
}

const Details: React.SFC<DetailsProps> = (props: DetailsProps) => {
  const {
    handleAddSavedJob,
    handleRemoveSavedJob,
    isLoggedIn,
    jobs,
    notificationMessage,
    notificationType,
    savedJobs,
  } = props;
  const { id } = useParams();
  const [data, setData] = React.useState(null);
  const [applyLink, setApplyLink] = React.useState("");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect((): void => {
    const job = jobs.find((job: Job) => job.id === id);
    const isPlainLink = job.how_to_apply.slice(0, 5) === "<p><a";
    if (isPlainLink) {
      const href = job.how_to_apply
        .split(/(<p><a href=")/gm)[2]
        .split(/(<\/a><\/p>)/gm)[0]
        .split(/">/gm)[0];

      setApplyLink(href);
    }

    setData(job);
  }, []);

  const jobIsSaved =
    savedJobs && data
      ? savedJobs.findIndex((savedJob: Job) => savedJob.id === data.id) >= 0
      : false;

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
            {data &&
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
                <div dangerouslySetInnerHTML={{ __html: data.how_to_apply }} />
              ))}
          </DetailsHowToContainer>
        </DetailsSideContainer>

        <DetailsMainContainer>
          {notificationMessage && (
            <Notification
              message={notificationMessage}
              type={notificationType}
            />
          )}
          {data && (
            <>
              <DetailsMainTitleContainer>
                <DetailsMainInnerTitleContainer jobIsSaved={jobIsSaved}>
                  <h2 id="details-title">{data.title}</h2>
                  <div>
                    {data.type === "Full Time" && (
                      <p id="full-time-indicator">Full Time</p>
                    )}
                    {isLoggedIn && (
                      <button
                        id={
                          jobIsSaved
                            ? `remove-job-${data.id}`
                            : `save-job-${data.id}`
                        }
                        onClick={
                          jobIsSaved
                            ? () => handleRemoveSavedJob(data)
                            : () => handleAddSavedJob(data)
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
                    {formatDistanceToNow(new Date(data.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </DetailsCreatedContainer>
              </DetailsMainTitleContainer>

              <DetailsCompanyContainer>
                <DetailsLogoContainer>
                  {data.company_logo ? (
                    <img
                      alt="Company Logo"
                      id={`logo-${data.id}`}
                      // onError={handleImageError}
                      src={data.company_logo}
                    />
                  ) : (
                    <div>
                      <p>not found</p>
                    </div>
                  )}
                </DetailsLogoContainer>

                <DetailsCompanyRightContainer>
                  {data.company_url ? (
                    <a
                      href={data.company_url}
                      id="details-company-name"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {data.company}
                    </a>
                  ) : (
                    <p id="details-company-name">{data.company}</p>
                  )}

                  <div>
                    <i className="material-icons">public</i>
                    <p>{data.location}</p>
                  </div>
                </DetailsCompanyRightContainer>
              </DetailsCompanyContainer>

              <DetailsContainerDescription>
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
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
  jobs: state.application.jobs,
  notificationMessage: state.application.notificationMessage,
  notificationType: state.application.notificationType,
  savedJobs: state.user.savedJobs,
});

const mapDispatchToProps = (dispatch) => ({
  handleAddSavedJob: (job: Job) => dispatch(addSavedJob(job)),
  handleRemoveSavedJob: (job: Job) => dispatch(removeSavedJob(job)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
