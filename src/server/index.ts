import chalk from "chalk";

import App from "./app";
import AssetsController from "./controllers/assets";
import JobController from "./controllers/job";
import ScriptsController from "./controllers/scripts";

/**
 * Main Server Application.
 */
const main = async (): Promise<void> => {
  try {
    if (!process.env.PORT) throw new Error("No PORT");

    const app = new App(
      [new AssetsController(), new JobController(), new ScriptsController()],
      process.env.PORT
    );

    app.listen();
  } catch (error) {
    console.error(error);
  }
};

main();
