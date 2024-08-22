import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = "mongodb+srv://alexanderjmilliken:Jckctsaadm10@cluster0.ym3g10m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
export const dynamic = 'force-dynamic';

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

export async function GET(request, { params }) {
  try {
    const database = await connect('posts');
    const start = parseInt(params.slug.split('i')[0]);
    const end = parseInt(params.slug.split('i')[1]);

    console.log(start);
    console.log(end);
    console.log(params.slug);

    // Fetch posts sorted by the `time` field in descending order, with pagination
    const query = await database.collection('post')
      .find()
      .sort({ time: -1 }) // Sort by time field, newest first
      .skip(start)
      .limit(end)
      .toArray();

    const response = NextResponse.json({ data: query });
    response.headers.set('Cache-Control', 'no-store'); // Prevent caching

    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'An error occurred while fetching posts.' }, { status: 500 });
  }
}
