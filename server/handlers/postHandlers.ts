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
> =async(req, res) => {
  console.log(req.headers.authorization);
  
 return res.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = async (req, res) => {
  //TODO FOR User Exists
  //Todo get Userid from session
  //TODO Validate title and url not empty
  //TODO validate url is new or add a url to existing post
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
  await db.createPost(post);
  return res.sendStatus(200);
};
