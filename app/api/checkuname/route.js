export const dynamic = 'force-dynamic'
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://alexanderjmilliken:Jckctsaadm10@cluster0.ym3g10m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
import { NextResponse } from 'next/server';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect(database_name) {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    return client.db(database_name);
}


export async function POST(request) {
    try {
      const data = await request.json();
      console.log(data);
  
      const database = await connect('profile');
      const user = await database.collection('profile').findOne({ uname: data.username });
      console.log(user)
      if (user !== null) {
        return NextResponse.json({ data: true }); // Return false if user exists
      } else {
        return NextResponse.json({ data: false }); // Return true if user doesn't exist
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json({ error: 'An error occurred' });
    }
  }