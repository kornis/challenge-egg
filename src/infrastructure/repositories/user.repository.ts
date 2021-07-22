import { MongoConnection, mongoUri } from "../mongodb/mongo";
import { Child, User } from "../../domain/entities";
import { classToPlain } from "class-transformer";
import { connectDB } from "../utils";

export async function createUser(payload: User) {
  const client = await connectDB("egg_challenge");
  const query = {
    dni: payload.dni,
  };
  return await client.collection("users").updateOne(query, { $set: classToPlain(payload) }, { upsert: true });
}

export async function updateUser(payload: User) {
  const client = await connectDB("egg_challenge");
  const query = {
    dni: payload.dni,
  };
  return await client.collection("users").updateOne(query, { $set: classToPlain(payload) });
}

export async function findUser(key: string) {
  const client = await connectDB("egg_challenge");
  return await client.collection("users").findOne({ dni: key });
}

export async function createChild(payload: Child) {
  const client = await connectDB("egg_challenge");
  return await client.collection("children").insertOne(classToPlain(payload));
}

export async function updateChild(payload: Child) {
  const client = await connectDB("egg_challenge");
  const query = {
    dni: payload.dni,
  };
  return await client.collection("children").updateOne(query, { $set: classToPlain(payload) });
}
