import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_CLIENT;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connect(database_name) {
  await client.connect();
  return client.db(database_name);
}
