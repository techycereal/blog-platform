export const dynamic = 'force-dynamic'
import {connect} from '../../lib/databaseUtil'
import { NextResponse } from 'next/server';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

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