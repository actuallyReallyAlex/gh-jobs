import * as React from "react";
import { connect } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useParams, Link } from "react-router-dom";

import Copyright from "../components/Copyright";
import { validURL } from "../util";
import { Job, RootState } from "../types";

interface DetailsProps {
  jobs: Job[];
}

const Details: React.SFC<DetailsProps> = (props: DetailsProps) => {
  const { jobs } = props;
  let { id } = useParams();
  const [data, setData] = React.useState(null);
  React.useEffect((): void => {
    const job = jobs.find((job: Job) => job.id === id);
    setData(job);
  }, []);
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
              (validURL(data.how_to_apply) ? (
                <a
                  className="details__side__link"
                  href={data.how_to_apply}
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
          {data && (
            <>
              <div className="details__container__title">
                <div className="details__container__title__inner">
                  <h2 className="details__title">{data.title}</h2>
                  {data.type === "Full Time" && (
                    <p className="details__title__fulltime">Full Time</p>
                  )}
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
                  <p className="details__company">{data.company}</p>
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
  jobs: state.application.jobs,
});

export default connect(mapStateToProps)(Details);
