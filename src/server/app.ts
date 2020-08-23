import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";

import { Controller } from "./types";

/**
 * Server Application.
 */
class App {
  public app: express.Application;

  public port: string;

  constructor(controllers: Controller[], port: string) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(): void {
    if (!process.env.MONGODB_URL) throw new Error("No MOONGODB_URL");

    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    this.app.use(cookieParser());
    this.app.use(express.json());

    if (process.env.NODE_ENV !== "test") {
      this.app.use(morgan("dev"));
    }

    const whitelistDomains = [
      "http://localhost:3000",
      "http://localhost:8080",
      "https://gh-jobs.herokuapp.com",
      "https://www.githubjobs.io",
      "http://localhost:3001", // * Browsersync
      "http://192.168.1.228:3001", // * Browsersync
      "http://localhost:3002", // * Browsersync
      "http://192.168.1.228:3002", // * Browsersync
      undefined,
    ];

    const corsOptions: CorsOptions = {
      origin: (
        requestOrigin: string | undefined,
        callback: (error?: Error, success?: boolean) => void
      ): void => {
        if (whitelistDomains.indexOf(requestOrigin) !== -1) {
          callback(null, true);
        } else {
          console.error(`Sever refused to allow: ${requestOrigin}`);
          callback(new Error("Not allowed by CORS"));
        }
      },
    };

    this.app.use(cors(corsOptions));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });

    this.app.use(express.static(path.join(__dirname, "../dist")));

    this.app.get("*", (req: Request, res: Response) => {
      // if (req.headers.host === "gh-jobs.herokuapp.com") {
      //   return res.status(301).redirect("https://www.githubjobs.io/");
      // }

      if (req.hostname === "gh-jobs.herokuapp.com") {
        return res.status(301).redirect("https://www.githubjobs.io/");
      }

      // ? Use this.app.all?

      console.log(
        chalk.blueBright.inverse(
          JSON.stringify(
            {
              host: req.headers.host,
              referrer: req.headers.referer,
            },
            null,
            2
          )
        )
      );
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Mode: ${chalk.blueBright(process.env.NODE_ENV)}\n`);
      console.log(
        `Server is listening on port: ${chalk.blueBright(this.port)}\n`
      );
    });
  }
}

export default App;
