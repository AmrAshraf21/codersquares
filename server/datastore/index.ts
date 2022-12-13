import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { inMemoryDataStore } from "./memorydb";
import { PostDao } from "./dao/PostDao";
import { UserDao } from "./dao/UserDao";

export interface Datastore extends UserDao, LikeDao, CommentDao, PostDao {}

export const db = new inMemoryDataStore();
