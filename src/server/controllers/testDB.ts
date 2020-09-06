import express, { Request, Response, Router } from "express";

import JobModel from "../models/Job";
import UserModel from "../models/User";

import { generateFakeJob } from "../util";

import { ErrorResponse, Job, JobDocument, User } from "../types";

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

    this.router.get(
      "/createStaleUser",
      async (
        req: Request,
        res: Response
      ): Promise<Response<ErrorResponse | User>> => {
        if (process.env.NODE_ENV !== "test") {
          return res.status(500).send({ error: "Invalid environment." });
        }

        try {
          const staleUser = new UserModel({
            email: "stale@user.com",
            hiddenJobs: ["7", "4", "1", "8", "9", "100", "101", "102"],
            name: "Stale User",
            password: "Red123456!!!",
            savedJobs: ["2", "5", "6", "3", "0", "103", "104", "105"],
          });

          const token = await staleUser.generateAuthToken();

          // * Set a Cookie with that token
          res.cookie("ghjobs", token, {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            secure: false,
            sameSite: true,
          });

          await staleUser.save();

          console.log("Created stale job user in Test DB.");

          return res.status(201).send(staleUser);
        } catch (error) {
          console.error(error);
          res.status(500).send({ error });
        }
      }
    );
  }
}

export default TestDBController;
