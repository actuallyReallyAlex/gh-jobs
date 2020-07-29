import endOfToday from "date-fns/endOfToday";
import express, { Request, Response, Router } from "express";
import isWithinInterval from "date-fns/isWithinInterval";
import nfetch from "node-fetch";
import startOfToday from "date-fns/startOfToday";

import JobModel from "../models/Job";

import { createSearchURL, getAllJobsFromAPI, isError } from "../util";

import { GetJobsErrorResponse, GetJobsSuccessResponse, Job } from "../types";

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
              result.map(async (job: Job) => {
                const newJob = new JobModel(job);
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
                result.map(async (job: Job) => {
                  const newJob = new JobModel(job);
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
          console.error(error);
          res.status(500).send({ error });
        }
      }
    );

    // TODO - Modify
    this.router.get("/jobs/search", async (req: Request, res: Response) => {
      try {
        const { description, full_time, location } = req.query;
        const jobs: Job[] = [];
        let jobsInBatch = null;
        let page = 1;

        while (jobsInBatch !== 0) {
          const url = createSearchURL(page, description, full_time, location);

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

        res.send(jobs);
      } catch (error) {
        res.status(500).send({ error });
      }
    });
  }
}

export default JobController;
