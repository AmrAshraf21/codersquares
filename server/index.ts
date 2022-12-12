import express, { RequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandlers";

const app = express();

app.use(express.json());

const requestHandler: RequestHandler = (req, res, next) => {
  console.log(`${req.method}, ${req.path} , ${JSON.stringify(req.body)}`);

  next();
};
app.use(requestHandler);

app.get("/posts", listPostsHandler);

app.post("/posts", createPostHandler);

app.listen(1337);
