import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export function generateToken(payload: Record<string, any>) {
  payload.exp = Date.now() / 1000 + 60 * 60 * 24;
  return jwt.sign(payload, JWT_SECRET || "S3cReT07954");
}

export function validateToken(token: string) {
  return jwt.verify(token, JWT_SECRET || "S3cReT07954");
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
