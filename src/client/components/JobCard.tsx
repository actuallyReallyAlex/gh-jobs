import * as React from "react";
import { Job } from "../types";

export interface JobCardProps {
  job: Job;
}

const JobCard: React.SFC<JobCardProps> = (props: JobCardProps) => {
  const { job } = props;
  return <div>JOBCARD</div>;
};

export default JobCard;
