import { MongoConnection, mongoUri } from "../mongodb/mongo";
export const connectDB = async (db_name: string) => {
  const connection = await MongoConnection.CreateConnection(mongoUri);
  return connection.client.db(db_name);
};
