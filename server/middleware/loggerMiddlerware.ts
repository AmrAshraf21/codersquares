import { RequestHandler } from "express";

export const requestHandler: RequestHandler = (req, res, next) => {
    console.log(`${req.method}, ${req.path} , ${JSON.stringify(req.body)}`);

    next();
  };
  