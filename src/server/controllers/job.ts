import express, { Request, Response, Router } from "express";
import nfetch from "node-fetch";

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

        res.send(jobs);
      } catch (error) {
        res.status(500).send({ error });
      }
    });

    this.router.get("/jobs/search", async (req: Request, res: Response) => {
      try {
        const { description, full_time, location } = req.query;
        // TODO - FIX! the url is
        // https://jobs.github.com/positions.json?full_time=false&description=engineer&location=undefined
        // let url = `https://jobs.github.com/positions`
        console.log({ description, full_time, location });
        console.log(
          `https://jobs.github.com/positions.json?full_time=${full_time}&description=${description}&location=${location}`
        );
        const response = await nfetch(
          `https://jobs.github.com/positions.json?full_time=${full_time}&description=${description}&location=${location}`,
          { headers: { "Content-Type": "application/json" }, method: "GET" }
        );
        console.log(response);
        const jobs: Job[] = await response.json();
        console.log(jobs.length);

        res.send(jobs);
      } catch (error) {
        res.status(500).send({ error });
      }
    });
  }
}

export default JobController;
