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


export async function GET(request, { params }) { 
    try{
        const database = await connect('posts')
        const query = await database.collection('post').find({owner: params.slug}).toArray()
        console.log(query)
        return NextResponse.json({data: query})
    } catch(err) {
        console.log(err)
    }
}