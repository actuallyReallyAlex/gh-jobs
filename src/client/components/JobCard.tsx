import * as React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

import { Job } from "../types";

export interface JobCardProps {
  job: Job;
}

const JobCard: React.SFC<JobCardProps> = (props: JobCardProps) => {
  const { job } = props;
  const handleImageError = () => {
    // TODO - Should set the image to a fallback/just display the div with the not found text
    alert("IMAGE ERROR - CREATE FUNCTIONALITY");
  };
  return (
    <div className="jobcard__container">
      <div className="flex">
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

        <div className="jobcard__middle__container">
          <p className="jobcard__company">{job.company}</p>
          <Link to={`/${job.id}`}>
            <p className="jobcard__title">{job.title}</p>
          </Link>
          {job.type === "Full Time" && (
            <p className="jobcard__fulltime">Full Time</p>
          )}
        </div>
      </div>

      <div className="jobcard__right__container">
        <div className="jobcard__location">
          <i className="material-icons">public</i>
          <p>{job.location}</p>
        </div>
        <div className="jobcard__created">
          <i className="material-icons">access_time</i>
          <p>
            {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
