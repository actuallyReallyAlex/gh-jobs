import endOfToday from "date-fns/endOfToday";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfToday from "date-fns/startOfToday";
import express, { Request, Response, Router } from "express";
import nfetch from "node-fetch";
import path from "path";

import JobModel from "../models/Job";

import { getAllJobsFromAPI, isError, unique } from "../util";

import {
  GetJobsErrorResponse,
  GetJobsSuccessResponse,
  Job,
  GetJobDetailsErrorResponse,
  GetJobDetailsSuccessResponse,
  GitHubJob,
} from "../types";

/**
 * Job Controller.
 */
class JobController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(
      "/jobs",
      async (
        req: Request,
        res: Response
      ): Promise<Response<GetJobsErrorResponse | GetJobsSuccessResponse>> => {
        try {
          const currentJobs = await JobModel.find({});

          // * No Jobs exist in DB
          if (currentJobs.length === 0) {
            const result = await getAllJobsFromAPI();

            if (isError(result)) {
              return res.status(500).send(result);
            }

            await Promise.all(
              result.map(async (job: GitHubJob) => {
                const newJobObject: Job = {
                  ...job,
                  listingDate: job.created_at,
                };
                const newJob = new JobModel(newJobObject);
                await newJob.save();
                return;
              })
            );

            const dbJobs = await JobModel.find({});
            return res.send(dbJobs);
          } else {
            // * Jobs exist in DB
            const { createdAt } = currentJobs[0];

            const isWithinToday = isWithinInterval(new Date(createdAt), {
              start: startOfToday(),
              end: endOfToday(),
            });

            if (!isWithinToday) {
              // * Jobs are stale. Get new jobs.
              const result = await getAllJobsFromAPI();

              if (isError(result)) {
                return res.status(500).send(result);
              }

              // * Drop the current database of Jobs
              await JobModel.collection.drop();

              // * Create new Job entries
              await Promise.all(
                result.map(async (job: GitHubJob) => {
                  const newJobObject: Job = {
                    ...job,
                    listingDate: job.created_at,
                  };
                  const newJob = new JobModel(newJobObject);
                  await newJob.save();
                  return;
                })
              );

              const dbJobs = await JobModel.find({});
              return res.send(dbJobs);
            } else {
              // * Jobs are fine, send that.
              return res.send(currentJobs);
            }
          }
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }
          res.status(500).send({ error });
        }
      }
    );

    // TODO - Optimize (?)
    this.router.get(
      "/jobs/search",
      async (
        req: Request,
        res: Response
      ): Promise<Response<GetJobsErrorResponse | GetJobsSuccessResponse>> => {
        try {
          const {
            contract,
            description,
            full_time,
            location1,
            location2,
            location3,
            location4,
            location5,
          } = req.query;

          const isLocationSearch =
            location1 || location2 || location3 || location4;

          // * If there is a location in the search, use the API
          // * If there is not a location, just query the DB

          if (isLocationSearch) {
            const jobs: Job[] = [];
            let jobsInBatch = null;
            let page = 1;
            const locations = [
              location1,
              location2,
              location3,
              location4,
              location5,
            ];

            await Promise.all(
              locations.map(async (location: string | undefined) => {
                if (location) {
                  while (jobsInBatch !== 0) {
                    const url = `https://jobs.github.com/positions.json?page=${page}&description=${encodeURI(
                      description.toString()
                    )}&location=${encodeURI(location)}`;

                    const response = await nfetch(url, {
                      headers: { "Content-Type": "application/json" },
                      method: "GET",
                    });
                    const batchJobs: Job[] = await response.json();
                    jobsInBatch = batchJobs.length;
                    page++;
                    if (jobsInBatch !== 0) {
                      jobs.push(...batchJobs);
                    }
                  }
                }
              })
            );

            const uniqueResults: Job[] = unique(jobs);

            return res.send(uniqueResults);
          }

          // * Make Searches
          const regexSearch = new RegExp(description.toString(), "i");

          const companyQuery = JobModel.find({ company: regexSearch });
          const descriptionQuery = JobModel.find({ description: regexSearch });
          const titleQuery = JobModel.find({ title: regexSearch });

          if (full_time === "true") {
            companyQuery.find({ type: "Full Time" });
            descriptionQuery.find({ type: "Full Time" });
            titleQuery.find({ type: "Full Time" });
          } else if (contract === "true") {
            companyQuery.find({ type: "Contract" });
            descriptionQuery.find({ type: "Contract" });
            titleQuery.find({ type: "Contract" });
          }

          const companyResults = await companyQuery.exec();
          const descriptionResults = await descriptionQuery.exec();
          const titleResults = await titleQuery.exec();

          // * Combine search results into 1 array
          const searchResults: Job[] = [
            ...companyResults,
            ...descriptionResults,
            ...titleResults,
          ];

          const uniqueResults: Job[] = unique(searchResults);

          return res.send(uniqueResults);
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }
          res.status(500).send({ error });
        }
      }
    );

    this.router.get(
      "/jobs/:id",
      async (
        req: Request,
        res: Response
      ): Promise<Response<
        GetJobDetailsErrorResponse | GetJobDetailsSuccessResponse
      > | void> => {
        if (!req.headers.referer) {
          return res.sendFile(path.join(__dirname, "../../dist/index.html"));
        }

        try {
          const { id } = req.params;
          const jobDetails = await JobModel.findOne({ id });

          return res.send(jobDetails);
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }
          res.status(500).send({ error });
        }
      }
    );
  }
}

export default JobController;
