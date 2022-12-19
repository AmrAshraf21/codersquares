import { Post, User } from "./types";

//Post APIS
export interface ListPostRequest {}
export interface ListPostResponse {
  posts: Post[];
}
export type CreatePostRequest = Pick<Post, "title" | "url">;
export interface CreatePostResponse {}

export interface GetPostRequest {}

export interface GetPostResponse {
  post: Post;
}

export type SignUpRequest = Pick<
  User,
  "email" | "firstName" | "lastName" | "password" | "username"
>;
export interface SingUpResponse{
  jwt:string;
}

export interface SingInRequest {
  login:string;
  password:string;
}

export type SingInResponse = {
  user:Pick<User,'email'|'firstName'|'lastName'|'username'|'id'>;
  jwt :string;
}
  