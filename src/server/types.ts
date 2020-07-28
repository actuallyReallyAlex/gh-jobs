import { Request, Router } from "express";
import { Document, Model } from "mongoose";

export interface AuthenticatedRequest extends Request {
  token: string;
  user: UserDocument;
}

export type Controller = {
  router: Router;
};

export type EditSavedJobsMethod = "ADD" | "REMOVE";

export interface GetAllJobsFromAPIError {
  error: string;
}

export interface GetAllJobsFromAPISuccess {
  entries: Job[];
}

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

export interface JobsDocument extends Document {
  _id: string;
  entries: Job[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type JobType = "Contract" | "Full Time";

export interface Token {
  _id: string;
  token: string;
}

export interface UserDocument extends Document {
  _id: string;
  email: string;
  generateAuthToken(): Promise<string>;
  password: string;
  name: string;
  savedJobs: Job[];
  tokens: Token[];
}

export interface UserModel extends Model<UserDocument> {
  findByCredentials(email: string, password: string): Promise<UserDocument>;
}
