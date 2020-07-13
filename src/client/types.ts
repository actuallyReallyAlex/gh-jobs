export interface Job {
  company: string;
  company_logo: string;
  company_url: string;
  created_at: string;
  description: string;
  how_to_apply: string;
  id: string;
  location: string;
  title: string;
  type: JobType;
  url: string;
}

export type JobType = "Full Time";

export interface LocationOption {
  name: string;
  setter: (param: string) => void;
  value: string;
}
