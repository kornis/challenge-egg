import { Child, Credentials, User } from "../../domain/entities";
import { classToPlain, plainToClass } from "class-transformer";
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

export async function findUserById(_id: string): Promise<User | null> {
  const client = await connectDB("egg_challenge");
  const user = await client.collection("users").findOne({ credentials: _id });
  return user ? plainToClass(User, user) : null;
}

export async function findUserByDni(dni: string) {
  const client = await connectDB("egg_challenge");
  return await client.collection("users").findOne({ dni: dni });
}

export async function findUserByEmail(email: string): Promise<Credentials | null> {
  const client = await connectDB("egg_challenge");
  const userCredentials = await client.collection("user-credentials").findOne({ email: email });
  return userCredentials ? plainToClass(Credentials, userCredentials) : null;
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

export async function createCredentials(payload: Credentials) {
  const client = await connectDB("egg_challenge");
  await client.collection("user-credentials");
  return await client.collection("user-credentials").insertOne(classToPlain(payload));
}
