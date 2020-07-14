import * as React from "react";
import { Job } from "../types";

export interface JobCardProps {
  job: Job;
}

const JobCard: React.SFC<JobCardProps> = (props: JobCardProps) => {
  const { job } = props;
  return (
    <div className="jobcard__container">
      <div className="jobcard__logo__container">
        <img alt="Company Logo" src={job.company_logo} />
      </div>

      <div>
        <h4>{job.company}</h4>
        <h3>{job.title}</h3>
        {job.type === "Full Time" && <span>Full Time</span>}
      </div>
      <div>
        <p>{job.location}</p>
        <p>{job.created_at}</p>
      </div>
    </div>
  );
};

export default JobCard;
