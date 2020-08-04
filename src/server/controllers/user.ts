import bcrypt from "bcryptjs";
import express, { Request, Response, Router } from "express";
import sgMail from "@sendgrid/mail";
import validator from "validator";

import auth from "../middleware/auth";

import JobModel from "../models/Job";
import User from "../models/User";

import {
  AuthenticatedRequest,
  EditSavedJobsMethod,
  GetSavedJobsDetailsErrorResponse,
  GetSavedJobsDetailsSuccessResponse,
  PatchSavedJobErrorResponse,
  PatchSavedJobSuccessResponse,
  Token,
  UserDocument,
  Job,
} from "../types";

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
          const existingUser = await User.findOne({ email: req.body.email });

          if (existingUser) {
            return res.status(400).send({
              error:
                "A user with that email address already exists. Please try logging in instead.",
            });
          }

          if (req.body.confirmPassword !== req.body.password) {
            return res.status(400).send({ error: "Passwords do not match." });
          }

          const newUser = new User({
            email: req.body.email,
            hiddenJobs: [],
            name: req.body.name,
            password: req.body.password,
            savedJobs: [],
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

          // * Send "Welcome" email
          if (process.env.NODE_ENV !== "test") {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to: req.body.email,
              from: "support@githubjobs.io",
              subject: "Welcome to GH Jobs!",
              text: `Welcome aboard! Welcome to GH Jobs. We're really excited you've decided to give GH Jobs a try. You can login to your account with your email address. Thanks, The GH Jobs Team`,
              html: `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title>Welcome!</title> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <style type="text/css"> #outlook a{padding: 0;}body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}p{display: block; margin: 13px 0;}</style><!--[if mso]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if lte mso 11]> <style type="text/css"> .mj-outlook-group-fix{width: 100% !important;}</style><![endif]--> <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700" rel="stylesheet" type="text/css"/> <style type="text/css"> @import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,700"); </style> <style type="text/css"> @media only screen and (min-width: 480px){.mj-column-per-100{width: 100% !important; max-width: 100%;}}</style> <style type="text/css"> @media only screen and (max-width: 480px){table.mj-full-width-mobile{width: 100% !important;}td.mj-full-width-mobile{width: auto !important;}}</style> </head> <body style="background-color: #f3f5fa;"> <div style="background-color: #f3f5fa;"><!--[if mso | IE]> <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" > <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> <div style=" background: #f3f5fa; background-color: #f3f5fa; margin: 0px auto; max-width: 600px; " > <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: #ffffff; background-color: #ffffff; width: 100%;" > <tbody> <tr> <td style=" direction: ltr; font-size: 0px; padding: 20px 0; padding-bottom: 0px; padding-top: 0; text-align: center; " ><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="" style="vertical-align:top;width:600px;" ><![endif]--> <div class="mj-column-per-100 mj-outlook-group-fix" style=" font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%; " > <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%" > <tr> <td align="center" style=" font-size: 0px; padding: 10px 25px; padding-top: 0; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word; " > <table border="0" cellpadding="0" cellspacing="0" role="presentation" style=" border-collapse: collapse; border-spacing: 0px; " > <tbody> <tr> <td style="width: 600px;"> <img alt="" height="auto" src="https://www.githubjobs.io/assets/handshake.jpg" style=" border: none; display: block; outline: none; text-decoration: none; height: auto; width: 100%; font-size: 13px; " width="600"/> </td></tr></tbody> </table> </td></tr></table> </div><!--[if mso | IE]> </td></tr></table><![endif]--> </td></tr></tbody> </table> </div><!--[if mso | IE]> </td></tr></table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" > <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> <div style=" background: #009fe3; background-color: #009fe3; margin: 0px auto; max-width: 600px; " > <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: #009fe3; background-color: #009fe3; width: 100%;" > <tbody> <tr> <td style=" direction: ltr; font-size: 0px; padding: 20px 0; padding-bottom: 0px; padding-top: 0; text-align: center; " ><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="" style="vertical-align:top;width:600px;" ><![endif]--> <div class="mj-column-per-100 mj-outlook-group-fix" style=" font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%; " > <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%" > <tr> <td align="left" style=" font-size: 0px; padding: 10px 25px; padding-top: 50px; padding-right: 25px; padding-bottom: 30px; padding-left: 25px; word-break: break-word; " > <div style=" font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 45px; font-weight: bold; line-height: 1; text-align: left; color: #ffffff; " > Welcome aboard! </div></td></tr></table> </div><!--[if mso | IE]> </td></tr></table><![endif]--> </td></tr></tbody> </table> </div><!--[if mso | IE]> </td></tr></table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" > <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> <div style=" background: #009fe3; background-color: #009fe3; margin: 0px auto; max-width: 600px; " > <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: #009fe3; background-color: #009fe3; width: 100%;" > <tbody> <tr> <td style=" direction: ltr; font-size: 0px; padding: 20px 0; padding-bottom: 20px; padding-top: 20px; text-align: center; " ><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="" style="vertical-align:middle;width:600px;" ><![endif]--> <div class="mj-column-per-100 mj-outlook-group-fix" style=" font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: middle; width: 100%; " > <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: middle;" width="100%" > <tr> <td align="left" style=" font-size: 0px; padding: 10px 25px; padding-right: 25px; padding-left: 25px; word-break: break-word; " > <div style=" font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 22px; line-height: 1; text-align: left; color: #ffffff; " > Welcome to GH Jobs. </div></td></tr><tr> <td align="left" style=" font-size: 0px; padding: 10px 25px; padding-right: 25px; padding-left: 25px; word-break: break-word; " > <div style=" font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1; text-align: left; color: #ffffff; " > We&apos;re really excited you&apos;ve decided to give GH Jobs a try. You can login to your account with your email address. </div></td></tr><tr> <td align="left" vertical-align="middle" style=" font-size: 0px; padding: 10px 25px; word-break: break-word; " > <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; line-height: 100%;" > <tr> <td align="center" bgcolor="#ffffff" role="presentation" style=" border: none; border-radius: 10px; cursor: auto; mso-padding-alt: 10px 25px; background: #ffffff; " valign="middle" > <a href="https://www.githubjobs.io/login" rel="noopener noreferrer" style=" display: inline-block; background: #ffffff; color: #1aa0e1; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 22px; font-weight: bold; line-height: 120%; margin: 0; text-decoration: none; text-transform: none; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 10px; " target="_blank" > Login </a> </td></tr></table> </td></tr><tr> <td align="left" style=" font-size: 0px; padding: 10px 25px; padding-right: 25px; padding-left: 25px; word-break: break-word; " > <div style=" font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1; text-align: left; color: #ffffff; " > Thanks, <br/> The GH Jobs Team </div></td></tr></table> </div><!--[if mso | IE]> </td></tr></table><![endif]--> </td></tr></tbody> </table> </div><!--[if mso | IE]> </td></tr></table><![endif]--> </div></body></html>`,
            };
            sgMail.send(msg);
          }

          return res.status(201).send(newUser);
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }

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

    this.router.get(
      "/user/me",
      auth,
      async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
        try {
          return res.send(req.user);
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }
          return res.status(500).send({ error });
        }
      }
    );

    this.router.post(
      "/user/login",
      async (
        req: express.Request,
        res: express.Response
      ): Promise<Response> => {
        try {
          if (!validator.isEmail(req.body.email)) {
            return res.status(400).send({ error: "Invalid email" });
          }

          const user: UserDocument = await User.findByCredentials(
            req.body.email,
            req.body.password
          );

          if (!user) {
            return res.status(401).send({ error: "Invalid credentials." });
          }

          const token = await user.generateAuthToken();
          // * Set a Cookie with that token
          res.cookie("ghjobs", token, {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // * localhost isn't https
            sameSite: true,
          });

          return res.send(user);
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }
          return res.status(500).send({});
        }
      }
    );

    this.router.post(
      "/user/logout",
      auth,
      async (req: AuthenticatedRequest, res: Response) => {
        try {
          req.user.tokens = req.user.tokens.filter(
            (token: Token) => token.token !== req.token
          );
          await req.user.save();

          res.clearCookie("ghjobs");

          return res.send({});
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }
          return res.status(500).send({ error });
        }
      }
    );

    this.router.post(
      "/user/logout/all",
      auth,
      async (req: AuthenticatedRequest, res: Response) => {
        try {
          req.user.tokens = [];
          await req.user.save();

          res.clearCookie("ghjobs");

          return res.send({});
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }
          return res.status(500).send({ error });
        }
      }
    );

    this.router.patch(
      "/user/savedJobs",
      auth,
      async (
        req: AuthenticatedRequest,
        res: Response
      ): Promise<
        Response<PatchSavedJobErrorResponse | PatchSavedJobSuccessResponse>
      > => {
        try {
          const method: EditSavedJobsMethod = req.body.method;
          const id: string = req.body.id;
          const currentSavedJobs: string[] = req.user.savedJobs;
          let newJobs;

          if (method !== "ADD" && method !== "REMOVE") {
            // * Request is incorrect - error
            // ! Should never happen
            return res.status(400).send({ error: "Invalid request." });
          }

          if (method === "ADD") {
            // * User is attempting to add a saved job
            newJobs = [...currentSavedJobs, id];
          } else if (method === "REMOVE") {
            // * User is attempting to remove a saved job
            newJobs = currentSavedJobs.filter(
              (savedJobID: string) => savedJobID !== id
            );
          }
          req.user.savedJobs = newJobs;
          await req.user.save();
          return res.send(req.user);
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }

          return res.status(500).send({ error });
        }
      }
    );

    this.router.get(
      "/user/savedJobsDetails",
      auth,
      async (
        req: AuthenticatedRequest,
        res: Response
      ): Promise<
        Response<
          GetSavedJobsDetailsErrorResponse | GetSavedJobsDetailsSuccessResponse
        >
      > => {
        try {
          const { savedJobs } = req.user;

          const savedJobsDetails: Job[] = [];
          let dbError = false;

          await Promise.all(
            savedJobs.map(async (id: string) => {
              const job = await JobModel.findOne({ id });

              if (!job) {
                return (dbError = true);
              }
              return savedJobsDetails.push(job);
            })
          );

          if (dbError) {
            return res
              .status(500)
              .send({ error: "Error finding corresponding jobs in database." });
          }

          return res.send(savedJobsDetails);
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }
          return res.status(500).send({ error });
        }
      }
    );

    this.router.patch(
      "/user/me",
      auth,
      async (req: AuthenticatedRequest, res: Response) => {
        try {
          if (req.body.email || req.body.name) {
            // * New Email / New Name
            const newEmail = req.body.email;
            const newName = req.body.name;

            if (!newEmail || !validator.isEmail(newEmail)) {
              return res.status(400).send({ error: "Invalid email." });
            }

            if (!newName || validator.isEmpty(newName)) {
              return res.status(400).send({ error: "Invalid name." });
            }

            req.user.email = newEmail;
            req.user.name = newName;
            await req.user.save();

            return res.send(req.user);
          }

          const { currentPassword, newPassword } = req.body;

          // * Check if currrentPassword matches password in DB
          const isMatch = await bcrypt.compare(
            currentPassword,
            req.user.password
          );
          if (!isMatch) {
            return res.status(401).send({ error: "Invalid credentials." });
          }

          // * Set newPassword
          req.user.password = newPassword;
          await req.user.save();

          // * Send User as respoonse
          return res.send(req.user);
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }

          return res.status(500).send({ error });
        }
      }
    );

    this.router.delete(
      "/user/me",
      auth,
      async (req: AuthenticatedRequest, res: Response) => {
        try {
          res.clearCookie("ghjobs");
          await req.user.remove();
          res.send(req.user);
        } catch (error) {
          if (process.env.NODE_ENV !== "test") {
            console.error(error);
          }
          res.status(500).send({ error });
        }
      }
    );
  }
}

export default UserController;
