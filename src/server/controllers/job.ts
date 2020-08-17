import endOfToday from "date-fns/endOfToday";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfToday from "date-fns/startOfToday";
import express, { Request, Response, Router } from "express";
import nfetch from "node-fetch";
import path from "path";

import JobModel from "../models/Job";

import { unique, rehydrateJobsDB } from "../util";

import {
  GetJobsErrorResponse,
  GetJobsSuccessResponse,
  Job,
  GetJobDetailsErrorResponse,
  GetJobDetailsSuccessResponse,
  JobDocument,
} from "../types";
import User from "../models/User";

/**
 * Job Controller.
 */
class JobController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(
      "/jobs",
      async (
        req: Request,
        res: Response
      ): Promise<Response<GetJobsErrorResponse | GetJobsSuccessResponse>> => {
        try {
          // * Get User Information
          const userId: string = req.body.userId;
          let user = null;
          let hiddenJobs: string[] = [];
          if (userId !== "") {
            user = await User.findById(userId);
            hiddenJobs = user.hiddenJobs;
          }

          // * Get Job Information
          let dbJobs: JobDocument[] = await JobModel.find({});

          // * No Jobs exist in DB
          if (dbJobs.length === 0) {
            const rehydrationResult = await rehydrateJobsDB();

            // TODO - Check for this in a different way
            if (rehydrationResult !== true) {
              return res.status(500).send(rehydrationResult);
            }

            // * Set dbJobs to new jobs
            dbJobs = await JobModel.find({});
          } else {
            // * Jobs exist in DB, but we need to ensure they are not stale jobs (from yesterday)
            const { createdAt } = dbJobs[0];

            const isWithinToday = isWithinInterval(new Date(createdAt), {
              start: startOfToday(),
              end: endOfToday(),
            });

            if (!isWithinToday) {
              // * Jobs are stale. Get new jobs.
              const rehydration2Result = await rehydrateJobsDB();

              // TODO - Check for this in a different way
              if (rehydration2Result !== true) {
                return res.status(500).send(rehydration2Result);
              }

              // * Set dbJobs to new jobs
              dbJobs = await JobModel.find({});
            }
          }

          // * Ensure that the user's hiddenJobs do not show in results
          const filteredDBJobs: JobDocument[] = dbJobs.filter(
            (jobDocument: JobDocument) => hiddenJobs.indexOf(jobDocument.id) < 0
          );

          return res.send(filteredDBJobs);
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
            userId,
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
            let finalResults = uniqueResults;

            // * Filter by non-hidden jobs
            if (userId) {
              // * Get User Information
              const user = await User.findById(userId);
              const hiddenJobs: string[] = user.hiddenJobs;
              finalResults = uniqueResults.filter(
                (job: Job) => hiddenJobs.indexOf(job.id) < 0
              );
            }

            return res.send(finalResults);
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
          let finalResults = uniqueResults;

          // * Filter by non-hidden jobs
          if (userId) {
            // * Get User Information
            const user = await User.findById(userId);
            const hiddenJobs: string[] = user.hiddenJobs;
            finalResults = uniqueResults.filter(
              (job: Job) => hiddenJobs.indexOf(job.id) < 0
            );
          }

          return res.send(finalResults);
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
