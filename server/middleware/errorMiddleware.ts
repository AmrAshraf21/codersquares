import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error("Uncaught exception💥", error);
  return res
    .status(500)
    .send("oops,an unexpected error occurred please try again later");
};
