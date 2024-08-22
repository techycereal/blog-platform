export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import {connect} from '../../lib/databaseUtil'

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
