import * as React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Job } from "../types";
import { Link } from "react-router-dom";

export interface JobCardProps {
  job: Job;
}

const JobCard: React.SFC<JobCardProps> = (props: JobCardProps) => {
  const { job } = props;
  return (
    <div className="jobcard__container">
      <div className="flex">
        <div className="jobcard__logo__container">
          <img alt="Company Logo" src={job.company_logo} />
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
