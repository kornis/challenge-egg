import jwt from "jsonwebtoken";
import { ITokenPayload } from "../../domain/interfaces/token-payload.interface";
import { JWT_SECRET } from "../config";

export function generateToken(payload: ITokenPayload) {
  payload.exp = Date.now() / 1000 + 60 * 60 * 24;
  return jwt.sign(payload, JWT_SECRET || "S3cReT07954");
}

export function validateToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET || "S3cReT07954");
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}

export function extractTokenFromHeader(headers: Record<string, any>) {
  return headers.authorization?.replace("Bearer ", "");
}
