import { JwtObject } from "./types";
import jwt from "jsonwebtoken";
export function signJwt(obj: JwtObject): string {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(obj, getJwtSecret(),{expiresIn:'15d'});
}

export function verifyJwt(token: string): JwtObject {
  return jwt.verify(token, getJwtSecret()) as JwtObject;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("Missing jwt");
    process.exit(1);
  }
  return secret;
}
