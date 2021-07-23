import { MongoConnection, mongoUri } from "../mongodb/mongo";
export const connectDB = async (db_name: string, cb: any) => {
  const connection = await MongoConnection.CreateConnection(mongoUri);
  const response = await cb(connection.client.db(db_name));
  connection.close();
  return response;
};
