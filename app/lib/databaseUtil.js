import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb+srv://alexanderjmilliken:Jckctsaadm10@cluster0.ym3g10m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
