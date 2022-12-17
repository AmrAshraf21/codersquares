import { Datastore } from "..";
import { User, Like, Comment, Post } from "../../types";
import sqlite3 from "sqlite3";
import { Database, open as sqliteOpen } from "sqlite";
import path from "path";

export class SqlDataStore implements Datastore {
 
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async OpenDb() {
    this.db = await sqliteOpen({
      filename: path.join(__dirname, "codersquare.sqlite"),
      driver: sqlite3.Database,
    });
    this.db.run("PRAGMA foreign_keys = ON;");

    await this.db.migrate({
      migrationsPath: path.join(__dirname, "migration"),
    });

    return this;
  }

 async createUser(user: User): Promise<void> {
    await this.db.run(
      `INSERT INTO users (id,email,password,firstName,lastName,username) VALUES (?,?,?,?,?,?)`,
      user.id,
      user.email,
      user.password,
      user.firstName,
      user.lastName,
      user.username
    );
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE email = ? `, email);
  }
  getUserById(id: string): Promise<User | undefined> {
    return this.db.get(`SELECT * FROM users WHERE id = ?` , id);
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get<User>(
      `SELECT * FROM users WHERE username = ? `,
      username
    );
  }
  createLike(like: Like): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listComments(postId: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  deleteComment(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listPosts(): Promise<Post[]> {
    return this.db.all<Post[]>("SELECT * FROM posts");
  }
  async createPost(post: Post): Promise<void> {
    await this.db.run(
      "INSERT INTO posts (id,title,url,postedAt,userId) VALUES (?,?,?,?,?)",
      post.id,
      post.title,
      post.url,
      post.postedAt,
      post.userId
    );
  }
  getPost(id: string): Promise<Post | undefined> {
    throw new Error("Method not implemented.");
  }
  deletePost(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
