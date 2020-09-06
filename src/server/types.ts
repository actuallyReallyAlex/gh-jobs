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

export interface ErrorResponse {
  error: string;
}

export type GetJobDetailsSuccessResponse = Job;

export type GetJobsSuccessResponse = GitHubJob[];

export interface GetHiddenJobsDetailsSuccessResponse {
  hiddenJobs: string[];
  hiddenJobsDetails: Job[];
  staleJobs: number;
}

export interface GetSavedJobsDetailsSuccessResponse {
  savedJobs: string[];
  savedJobsDetails: Job[];
  staleJobs: number;
}

export interface GitHubJob {
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

export interface Job {
  company: string;
  company_logo: string;
  company_url: string;
  description: string;
  howToApply: string;
  id: string;
  listingDate: string;
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
  description: string;
  howToApply: string;
  id: string;
  listingDate: string;
  location: string;
  title: string;
  type: JobType;
  url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type JobType = "Contract" | "Full Time";

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

export interface User {
  _id: string;
  email: string;
  hiddenJobs: string[];
  password: string;
  name: string;
  savedJobs: string[];
  tokens: Token[];
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
