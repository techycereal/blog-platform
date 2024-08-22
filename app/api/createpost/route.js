export const dynamic = 'force-dynamic';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = "mongodb+srv://alexanderjmilliken:Jckctsaadm10@cluster0.ym3g10m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect(database_name) {
  await client.connect();
  return client.db(database_name);
}

export async function POST(request) { 
  try {
    const data = await request.json();
    console.log(data);

    const database = await connect('posts');

    // Insert the post with the current timestamp
    await database.collection('post').insertOne({
      ownerName: data.ownerName,
      title: data.title,
      content: data.content,
      owner: data.owner,
      time: new Date() // Add the current date and time as the time field
    });

    return NextResponse.json({ data: 'success' });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'An error occurred while creating the post.' }, { status: 500 });
  }
}
