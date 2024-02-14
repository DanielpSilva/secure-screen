/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { ValidationRequestError } from "../errors/ValidationRequestError";
import { ResourceNotFoundError } from "../errors/ResourceNotFoundError";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidationRequestError) {
    res.status(400).json({
      message: "Invalid Request",
      timestamp: new Date(),
      errors: [err.message],
    });
  } else if (err instanceof ResourceNotFoundError) {
    res.status(404).json({
      message: "Resource not found",
      timestamp: new Date(),
      errors: [err.message],
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
      timestamp: new Date(),
    });
  }
}
