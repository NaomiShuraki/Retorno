import { NextFunction, Response } from "express";
import { logger } from "../Utils/logger";

export const catchAll = (err: any, res: Response, next: NextFunction) => {
  const statusCode = err.status;
  console.log(err.message);
  // Log the error
  logger(err.message);
  if (statusCode) {
    // Send back the error to the front
    res.status(statusCode).send(err.message);
  } else {
    res.status(200);
  }
};
