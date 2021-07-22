import { MongoConnection } from "../mongodb/mongo";

const mongoUri = process.env.MONGOURI as string;

export async function create(payload: any) {
  const connection = await MongoConnection.CreateConnection(mongoUri);
  const client = connection.client.db("egg_challenge");
  return await client.collection("users").insertOne(payload);
}
