import { Credentials, User } from "../../domain/entities";
import { classToPlain, plainToClass } from "class-transformer";
import { connectDB } from "../utils";
import { Db } from "mongodb";

export async function createUser(payload: User) {
  return await connectDB("egg_challenge", async (client: Db) => {
    return await client.collection("users").insertOne(classToPlain(payload));
  });
}

export async function updateUser(payload: User, id: string) {
  return await connectDB("egg_challenge", async (client: Db) => {
    try {
      let document = classToPlain(payload);
      delete document._id;
      const query = {
        credentials: id,
      };
      return await client.collection("users").updateOne(query, { $set: document });
    } catch (err) {
      console.error(err.message);
      return null;
    }
  });
}

export async function findUserById(id: string): Promise<User> {
  return await connectDB("egg_challenge", async (client: Db) => {
    try {
      const user = await client.collection("users").findOne({ credentials: id });
      return plainToClass(User, user);
    } catch (err) {
      throw new Error(err);
    }
  });
}

export async function findUserByDni(dni: string): Promise<User> {
  return await connectDB("egg_challenge", async (client: Db) => {
    return await client.collection("users").findOne({ dni: dni });
  });
}

export async function findUserByEmail(email: string): Promise<Credentials | null> {
  return await connectDB("egg_challenge", async (client: any) => {
    const userCredentials = await client.collection("user-credentials").findOne({ email: email });
    return userCredentials ? plainToClass(Credentials, userCredentials) : null;
  });
}

export async function createCredentials(payload: Credentials) {
  return await connectDB("egg_challenge", async (client: Db) => {
    try {
      await client.collection("user-credentials").createIndex({ email: 1 }, { unique: true });
      return await client.collection("user-credentials").insertOne(classToPlain(payload));
    } catch (err) {
      if (err.message.includes("duplicate key")) throw new Error("Email ya registrado");
      throw new Error(err.message);
    }
  });
}

export async function findChildren() {
  return await connectDB("egg_challenge", async (client: Db) => {
    const childrenList = await client.collection("users").find({ isChild: true }).limit(10).toArray();
    return childrenList;
  });
}
