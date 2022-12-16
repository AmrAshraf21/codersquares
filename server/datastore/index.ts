import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { inMemoryDataStore } from "./memorydb";
import { PostDao } from "./dao/PostDao";
import { UserDao } from "./dao/UserDao";
import { SqlDataStore } from "./sql";

export interface Datastore extends UserDao, LikeDao, CommentDao, PostDao {}

export let db : Datastore;

export async function initDb() {
    //db = new inMemoryDataStore(); 
    db = await new SqlDataStore().OpenDb();
}
