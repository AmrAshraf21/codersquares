import { CommentDao } from "./CommentDao";
import { LikeDao } from "./LikeDao";
import { inMemoryDataStore } from "./memorydb";
import { PostDao } from "./PostDao";
import { UserDao } from "./UserDao";

export interface Datastore extends UserDao,LikeDao,CommentDao,PostDao{}

export const db = new inMemoryDataStore();