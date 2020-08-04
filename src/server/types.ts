import { Request, Router } from "express";
import { Document, Model } from "mongoose";
import Job from "./models/Job";

export interface AuthenticatedRequest extends Request {
  token: string;
  user: UserDocument;
}

export type Controller = {
  router: Router;
};

export type EditHiddenJobsMethod = "ADD" | "REMOVE";

export type EditSavedJobsMethod = "ADD" | "REMOVE";

export interface GetJobDetailsErrorResponse {
  error: string;
}

export type GetJobDetailsSuccessResponse = Job;

export interface GetJobsErrorResponse {
  error: string;
}

export type GetJobsSuccessResponse = Job[];

export interface GetHiddenJobsDetailsErrorResponse {
  error: string;
}

export type GetHiddenJobsDetailsSuccessResponse = Job[];

export interface GetSavedJobsDetailsErrorResponse {
  error: string;
}

export type GetSavedJobsDetailsSuccessResponse = Job[];

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

export interface JobDocument extends Document {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type JobType = "Contract" | "Full Time";

export interface PatchSavedJobErrorResponse {
  error: string;
}

export interface PatchSavedJobSuccessResponse {
  createdAt: string;
  email: string;
  name: string;
  savedJobs: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Token {
  _id: string;
  token: string;
}

export interface UserDocument extends Document {
  _id: string;
  email: string;
  hiddenJobs: string[];
  generateAuthToken(): Promise<string>;
  password: string;
  name: string;
  savedJobs: string[];
  tokens: Token[];
}

export interface UserModel extends Model<UserDocument> {
  findByCredentials(email: string, password: string): Promise<UserDocument>;
}
