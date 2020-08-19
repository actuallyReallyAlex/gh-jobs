/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { UserDocument } from "../types";

export interface UserRequest extends Request {
  user?: UserDocument;
}

const auth = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const tokenFromCookie = req.cookies.ghjobs;
    // *Check if Cookie exists
    if (tokenFromCookie) {
      // *Verify the jwt value
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwt.verify(tokenFromCookie, process.env.JWT_SECRET);
      const user: UserDocument = await User.findOne({
        _id: decoded._id,
        "tokens.token": tokenFromCookie,
      });

      if (!user) {
        throw new Error(
          `No user found in database. { _id: ${decoded._id}, tokens.token: ${tokenFromCookie}, path: ${req.originalUrl} }`
        );
      }

      // * User is authenticated
      req.user = user;
      next();
    } else {
      // * User is not authenticated correctly
      res.redirect("/login");
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    res.status(500).send({ error });
  }
};

export default auth;
