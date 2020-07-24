import * as React from "react";
import { connect } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useParams, Link } from "react-router-dom";

import Copyright from "../components/Copyright";
import Notification from "../components/Notification";

import { addSavedJob, removeSavedJob } from "../redux/thunks";

import { Job, NotificationType, RootState } from "../types";

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
      <div className="details__container">
        <div className="details__side__container">
          <Link className="details__side__link" to="/">
            <i className="material-icons">west</i>
            <span>Back to search</span>
          </Link>
          <div className="details__container__how-to">
            <span className="details__container__label">How to Apply</span>
            {data &&
              (applyLink ? (
                <a
                  className="details__side__link"
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
          </div>
        </div>

        <div className="details__main__container">
          {notificationMessage && (
            <Notification
              message={notificationMessage}
              type={notificationType}
            />
          )}
          {data && (
            <>
              <div className="details__container__title">
                <div className="details__container__title__inner">
                  <h2 className="details__title">{data.title}</h2>
                  <div className="details__container__actions">
                    {data.type === "Full Time" && (
                      <p
                        className="details__title__fulltime"
                        id="full-time-indicator"
                      >
                        Full Time
                      </p>
                    )}
                    {isLoggedIn && (
                      <button
                        className={
                          jobIsSaved
                            ? "details__save__selected"
                            : "details__save__deselected"
                        }
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
                </div>

                <div className="details__created">
                  <i className="material-icons">access_time</i>
                  <p>
                    {formatDistanceToNow(new Date(data.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              <div className="details__container__company">
                <div className="details__logo__container">
                  {data.company_logo ? (
                    <img
                      alt="Company Logo"
                      id={`logo-${data.id}`}
                      // onError={handleImageError}
                      src={data.company_logo}
                    />
                  ) : (
                    <div className="details__logo__not-found">
                      <p>not found</p>
                    </div>
                  )}
                </div>

                <div className="details__company__right">
                  {data.company_url ? (
                    <a
                      className="details__company"
                      href={data.company_url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {data.company}
                    </a>
                  ) : (
                    <p className="details__company">{data.company}</p>
                  )}

                  <div className="details__location">
                    <i className="material-icons">public</i>
                    <p>{data.location}</p>
                  </div>
                </div>
              </div>

              <div className="details__container__description">
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              </div>
            </>
          )}
        </div>
      </div>
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
