import App from "./app";
import AssetsController from "./controllers/assets";
import JobController from "./controllers/job";
import ScriptsController from "./controllers/scripts";
import UserController from "./controllers/user";

/**
 * Main Server Application.
 */
const main = async (): Promise<void> => {
  try {
    if (!process.env.PORT) throw new Error("No PORT");

    const app = new App(
      [
        new AssetsController(),
        new JobController(),
        new ScriptsController(),
        new UserController(),
      ],
      process.env.PORT
    );

    app.listen();
  } catch (error) {
    console.error(error);
  }
};

main();
