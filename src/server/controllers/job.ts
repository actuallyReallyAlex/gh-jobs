import endOfToday from "date-fns/endOfToday";
import express, { Request, Response, Router } from "express";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfToday from "date-fns/startOfToday";

import JobModel from "../models/Job";

import { getAllJobsFromAPI, isError, unique } from "../util";

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
          const { description, full_time, location } = req.query;

          // * Make Searches
          const regexSearch = new RegExp(description.toString(), "i");

          const companyQuery = JobModel.find({ company: regexSearch });
          const descriptionQuery = JobModel.find({ description: regexSearch });
          const titleQuery = JobModel.find({ title: regexSearch });

          if (full_time === "true") {
            companyQuery.find({ type: "Full Time" });
            descriptionQuery.find({ type: "Full Time" });
            titleQuery.find({ type: "Full Time" });
          }

          // TODO - Handle multiple locations
          if (location) {
            companyQuery.find({
              location: new RegExp(location.toString(), "i"),
            });
            descriptionQuery.find({
              location: new RegExp(location.toString(), "i"),
            });
            titleQuery.find({ location: new RegExp(location.toString(), "i") });
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
  }
}

export default JobController;
