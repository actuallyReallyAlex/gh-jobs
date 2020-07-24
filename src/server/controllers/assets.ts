import express, { Router, Request, Response } from "express";
import path from "path";

/**
 * Assets Controller.
 */
class AssetsController {
  public router: Router = express.Router();

  static assetList: string[] = [
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "apple-touch-icon.png",
    "backgroundImg.png",
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "handshake.jpg",
    "site.webmanifest",
  ];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    AssetsController.assetList.forEach((asset: string) => {
      this.router.get(
        `/assets/${asset}`,
        async (req: Request, res: Response) => {
          res.sendFile(path.join(__dirname, `../assets/${asset}`));
        }
      );
    });
  }
}

export default AssetsController;
