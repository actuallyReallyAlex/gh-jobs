import express, { Request, Response, Router } from "express";

import JobModel from "../models/Job";

import { ErrorResponse, Job, JobDocument } from "../types";
import { generateFakeJob } from "../util";

/**
 * Test DB Controller.
 */
class TestDBController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(
      "/populateDB",
      async (
        req: Request,
        res: Response
      ): Promise<Response<ErrorResponse | Job[]>> => {
        if (process.env.NODE_ENV !== "test") {
          return res.status(500).send({ error: "Invalid environment." });
        }

        try {
          // * Drop current db of fake jobs
          await JobModel.collection.drop();

          // * Generate 50 Jobs
          const fakeJobs: Job[] = [];
          for (let i = 0; i < 50; i++) {
            fakeJobs.push(generateFakeJob(i));
          }

          // * Create 50 new jobs in DB
          await Promise.all(
            fakeJobs.map(async (job: Job) => {
              const newJob = new JobModel(job);
              await newJob.save();
              return;
            })
          );

          return res.send(fakeJobs);
        } catch (error) {
          console.error(error);
          res.status(500).send({ error });
        }
      }
    );

    this.router.get(
      "/fix-how-to-apply",
      async (
        req: Request,
        res: Response
      ): Promise<Response<ErrorResponse | void>> => {
        if (process.env.NODE_ENV !== "test") {
          return res.status(500).send({ error: "Invalid environment." });
        }

        try {
          // * Get each job in DB
          const jobs: JobDocument[] = await JobModel.find({});

          // * Modify `howToApply` field of each job
          await Promise.all(
            jobs.map(async (job: JobDocument) => {
              const dbJob = await JobModel.find({ id: job.id });
              dbJob[0].howToApply =
                '<p><a href="https://www.google.com/"></a></p>';
              await dbJob[0].save();
              return;
            })
          );

          return res.send();
        } catch (error) {
          console.error(error);
          res.status(500).send({ error });
        }
      }
    );
  }
}

export default TestDBController;
