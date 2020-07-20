import bcrypt from "bcryptjs";
import express, { Request, Response, Router } from "express";
import validator from "validator";

import auth from "../middleware/auth";

import User from "../models/User";

import { AuthenticatedRequest, UserDocument, Token } from "../types";

/**
 * User Controller.
 */
class UserController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(
      "/user",
      async (req: Request, res: Response): Promise<Response> => {
        try {
          const newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
          });

          const token = await newUser.generateAuthToken();

          // * Set a Cookie with that token
          res.cookie("ghjobs", token, {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // * localhost isn't https
            sameSite: true,
          });

          await newUser.save();

          return res.status(201).send(newUser);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);

          if (error.errors.email) {
            return res.status(400).send({ error: error.errors.email.message });
          }

          if (error.errors.password) {
            return res
              .status(400)
              .send({ error: error.errors.password.message });
          }

          return res.status(400).send({ error });
        }
      }
    );
  }
}

export default UserController;
