import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandlers";

const app = express();

app.use(express.json());

const requestHandler: RequestHandler = (req, res, next) => {
  console.log(`${req.method}, ${req.path} , ${JSON.stringify(req.body)}`);

  next();
};
app.use(requestHandler);

app.get("/v1/posts", listPostsHandler);

app.post("/v1/posts", createPostHandler);

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error("Uncaught exception💥", error);
  return res
    .status(500)
    .send("oops,an unexpected error occurred please try again later");
};
app.use(errorHandler);

app.listen(1337);
