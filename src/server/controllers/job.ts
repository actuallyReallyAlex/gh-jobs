import endOfToday from "date-fns/endOfToday";
import express, { Request, Response, Router } from "express";
import isWithinInterval from "date-fns/isWithinInterval";
import nfetch from "node-fetch";
import startOfToday from "date-fns/startOfToday";

import Jobs from "../models/Jobs";

import { createSearchURL, getAllJobsFromAPI } from "../util";

import { Job, GetAllJobsFromAPIError } from "../types";

/**
 * Job Controller.
 */
class JobController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get("/jobs", async (req: Request, res: Response) => {
      try {
        const currentJobs = await Jobs.find({});
        let response;

        // * No Jobs exist in DB
        if (currentJobs.length === 0) {
          const result = await getAllJobsFromAPI();
          if ((result as GetAllJobsFromAPIError).error) {
            return res.status(500).send(result);
          }
          const newJobs = new Jobs(result);
          await newJobs.save();
          response = newJobs;
        } else {
          // * Jobs exist in DB
          const { updatedAt } = currentJobs[0];

          const isWithinToday = isWithinInterval(new Date(updatedAt), {
            start: startOfToday(),
            end: endOfToday(),
          });

          if (!isWithinToday) {
            // * Jobs are stale. Get new jobs.
            const result = await getAllJobsFromAPI();

            if ((result as GetAllJobsFromAPIError).error) {
              return res.status(500).send(result);
            }

            await Jobs.deleteOne({});
            const newJobs = new Jobs(result);
            await newJobs.save();
            response = newJobs;
          } else {
            // * Jobs are fine, send that.
            response = currentJobs[0].entries;
          }
        }

        res.send(response);
      } catch (error) {
        res.status(500).send({ error });
      }
    });

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
