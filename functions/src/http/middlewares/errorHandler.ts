import {Request, Response, NextFunction} from "express";

export type Error = {
    status?: number;
    message?: string;
}

export class ApiError extends Error {
  constructor(readonly msg: string, readonly status: number) {
    super(msg);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({success: false, error: err.message});
  }
  return res.status(500).json({
    success: false, message: "Internal server error",
  });
};
