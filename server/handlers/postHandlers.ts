import { db } from "../datastore";
import { ExpressHandler, Post } from "../types";
import crypto from "crypto";
import {
  CreatePostRequest,
  CreatePostResponse,
  ListPostRequest,
  ListPostResponse,
} from "../api";

export const listPostsHandler: ExpressHandler<
  ListPostRequest,
  ListPostResponse
> = (req, res) => {
  res.send({ posts: db.listPosts() });
};

export const createPostHandler: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send("Title is Missing please Provide it..");
  }
  if (!req.body.title || !req.body.url || !req.body.userId) {
    return res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
  };
  db.createPost(post);
  res.sendStatus(200);
};
