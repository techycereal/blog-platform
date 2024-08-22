import { NextResponse } from 'next/server';
import {connect} from '../../../lib/databaseUtil'

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

    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'An error occurred while fetching posts.' }, { status: 500 });
  }
}
