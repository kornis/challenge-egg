import { MongoClient } from "mongodb";
import { MONGO_PASS, MONGO_USER } from "../config";

export const mongoUri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.efs1q.mongodb.net?retryWrites=true&w=majority`;
export class MongoConnection {
  constructor(public client: MongoClient) {}

  static async CreateConnection(mongoUrl: string): Promise<MongoConnection> {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    return new MongoConnection(client);
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}
