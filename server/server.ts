import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandlers";
import asyncHandler from "express-async-handler";
import { initDb } from "./datastore";
import { signInHandlers, signupHandlers } from "./handlers/authHandlers";
import { requestHandler } from "./middleware/loggerMiddlerware";
import { errorHandler } from "./middleware/errorMiddleware";
import dotenv from 'dotenv'
import { authMiddleware } from "./middleware/authMiddleware";

(async () => {

    await initDb();
    dotenv.config();

  const app = express();

  app.use(express.json());

  app.use(requestHandler);

  app.post('/v1/signup',asyncHandler(signupHandlers))
  app.post('/v1/signin',asyncHandler(signInHandlers));
  app.use(authMiddleware);

  app.get("/v1/posts", asyncHandler(listPostsHandler));

  app.post("/v1/posts", asyncHandler(createPostHandler));

  
  app.use(errorHandler);

  app.listen(1337, () => {
    console.log("Server Running💥👌");
  });
})();
