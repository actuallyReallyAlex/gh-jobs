import express, { Request, Response, Router } from "express";
import nfetch from "node-fetch";

import Jobs from "../models/Jobs";

import { createSearchURL } from "../util";

import { Job } from "../types";

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

        // * No Jobs exist in DB
        if (currentJobs.length === 0) {
          const jobs: Job[] = [];
          let jobsInBatch = null;
          let page = 1;

          // * Can only get 50 jobs at a time
          // * keep going until there are no more jobs
          while (jobsInBatch !== 0) {
            const response = await nfetch(
              `https://jobs.github.com/positions.json?page=${page}`,
              { headers: { "Content-Type": "application/json" }, method: "GET" }
            );
            const batchJobs: Job[] = await response.json();
            jobsInBatch = batchJobs.length;
            page++;
            if (jobsInBatch !== 0) {
              jobs.push(...batchJobs);
            }
          }
          const newJobs = new Jobs({ entries: jobs });
          await newJobs.save();
        }

        const { entries } = currentJobs[0];

        res.send(entries);
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
