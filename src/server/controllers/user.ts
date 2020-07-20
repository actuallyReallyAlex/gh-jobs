import express, { Router } from "express";

/**
 * User Controller.
 */
class UserController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {}
}

export default UserController;
