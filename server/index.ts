import express, { RequestHandler } from "express";
import { db } from "./datastore";

const app = express();

app.use(express.json());

const requestHandler: RequestHandler = (req, res, next) => {
  console.log(`${req.method}, ${req.path} , ${JSON.stringify(req.body)}`);

  next();
};
app.use(requestHandler);

app.get("/posts", (req, res) => {
  res.send({ posts: db.listPosts() });
});

app.post("/posts", (req, res, next) => {
  const post = req.body;
  db.createPost(post);
  res.sendStatus(200);
});

app.listen(1337);
