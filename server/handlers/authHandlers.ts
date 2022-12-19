import {
  SignUpRequest,
  SingInRequest,
  SingInResponse,
  SingUpResponse,
} from "../api";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from "crypto";
import { signJwt } from "../auth";

export const signupHandlers: ExpressHandler<
  SignUpRequest,
  SingUpResponse
> = async (req, res) => {
  const { email, lastName, firstName, password, username } = req.body;
  if (!email || !firstName || !lastName || !username || !password) {
    return res.status(400).send({ error: "All fields are required" });
  }
  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));
  if (existing) {
    return res.status(403).send({ error: "User Already Existing" });
  }
  const hashedPw = crypto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT!, 42, 64, "sha512")
    .toString("hex");
  const user: User = {
    id: crypto.randomUUID(),
    email,
    firstName,
    lastName,
    password: hashedPassword(password),
    username,
  };
  await db.createUser(user);
  const jwt = signJwt({ userId: user.id });
  return res.status(200).send({ jwt });
};

export const signInHandlers: ExpressHandler<
  SingInRequest,
  SingInResponse
> = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400);
  }
  const existing =
    (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));

  if (!existing || existing.password !== hashedPassword(password)) {
    return res.sendStatus(403);
  }
  const jwt = signJwt({ userId: existing.id });
  return res.status(200).send({
    user: {
      email: existing.email,
      firstName: existing.firstName,
      lastName: existing.lastName,
      id: existing.id,
      username: existing.username,
    },
    jwt,
  });
};

function hashedPassword(password: string): string {
  return crypto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT!, 42, 64, "sha512")
    .toString("hex");
}
