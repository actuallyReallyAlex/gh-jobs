import * as React from "react";
import { Job } from "../types";

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
          <p className="jobcard__title">{job.title}</p>
          {job.type === "Full Time" && (
            <p className="jobcard__fulltime">Full Time</p>
          )}
        </div>
      </div>

      <div className="jobcard__right__container">
        <p className="jobcard__location">{job.location}</p>
        <p className="jobcard__created">{job.created_at}</p>
      </div>
    </div>
  );
};

export default JobCard;
