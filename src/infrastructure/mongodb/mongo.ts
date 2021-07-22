import { MongoClient } from "mongodb";

export class MongoConnection {
  constructor(public client: MongoClient) {}

  static async CreateConnection(mongoUrl: string): Promise<MongoConnection> {
    const client = new MongoClient(mongoUrl, {});
    await client.connect();
    return new MongoConnection(client);
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}
